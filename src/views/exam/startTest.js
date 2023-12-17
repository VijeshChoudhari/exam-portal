import { useNavigate, useParams } from "react-router-dom";
import { createReport, getTestQuestions, isValidLink } from "../../axios/api";
import React, { useEffect, useRef, useState } from "react";
import { toaster } from "../../components/toaster/toaster";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Select from "react-select";
import moment from "moment";

const StartTest = () => {
  const [expired, setExpired] = useState(false);
  const [seconds, setSeconds] = useState(3600);
  const [loading, setLoading] = useState(true);
  const [testDetail, setTestDetail] = useState();
  const [questions, setQuestions] = useState([]);
  const param = useParams();
  let questionRefs = useRef([]);
  const navigate = useNavigate();
  const token = param.token;

  const handleQuestionClick = (index) => () => {
    // Scroll to the clicked question
    questionRefs[index].current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const getQuestions = async (testId) => {
    try {
      const resp = await getTestQuestions(testId);
      console.log(resp);
      questionRefs.current = Array.from(
        { length: resp.data.data.questions.length },
        () => React.createRef()
      );
      setQuestions(resp.data.data.questions);
    } catch (error) {
      toaster.errorToast(error.message);
    }
  };

  const submitTest = async () => {
    try {
      const resp = await createReport({
        ...testDetail,
        userResponse: questions,
      });
      console.log(resp);
      toaster.successToast("Test submited");
      // navigate("/admin/");
    } catch (error) {
      console.log(error);
      toaster.errorToast(error.message);
    }
  };

  const getExpired = async () => {
    try {
      const resp = await isValidLink({ token: token });
      console.log("resp", resp);
      setTestDetail(resp.data.data);
      setSeconds(resp.data?.data?.exp - moment().unix());
      setExpired(resp.data.expStatus);
      if (!resp.data.expStatus) {
        getQuestions(resp.data.data.testId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOptionsList = (options) => {
    let updatedOptions = [];
    for (let i = 0; i < options.length; i++) {
      updatedOptions.push({
        value: options[i],
        label: `Option ${i + 1}: ${options[i]} `,
      });
    }
    return updatedOptions;
  };

  useEffect(() => {
    getExpired();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        setExpired(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <div>
      <div className="m-2 rounded bg-white p-2">
        {!expired ? (
          <div className="flex">
            <form
              className="h-full w-3/4"
              onSubmit={(e) => {
                e.preventDefault();
                submitTest();
              }}
            >
              <div className="ml-2">
                Remaining Time : {moment.utc(seconds * 1000).format("mm:ss")}
              </div>
              <div className="h-[31rem] overflow-y-scroll">
                {questions?.length > 0 &&
                  questions.map((val, index) => {
                    return (
                      <div
                        ref={questionRefs[index]}
                        className="m-2 rounded bg-pink-200 p-2"
                      >
                        <h4 className="inline">{index + 1}.</h4>
                        <p className="ml-2 inline">{val.question}</p>
                        <Select
                          required
                          onChange={(e) => {
                            setQuestions((prev) => {
                              let updated = [...prev];
                              updated[index] = {
                                ...updated[index],
                                responseAns: e.value,
                              };
                              return updated;
                            });
                          }}
                          placeholder="Select Answer"
                          options={getOptionsList(val.options)}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className=" m-2">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </form>
            <div className="ml-2 mt-5 flex h-full w-1/3 flex-wrap p-2">
              {questions.length > 0 &&
                questions.map((val, index) => {
                  return (
                    <div
                      onClick={() => {
                        handleQuestionClick(index);
                      }}
                      className={
                        (val.responseAns ? ` bg-green-500 ` : ` bg-gray-400 `) +
                        ` m-2 flex h-8 w-8 items-center justify-center rounded p-2 text-center text-white hover:cursor-pointer `
                      }
                    >
                      {index + 1}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>Test Link expired</div>
        )}
      </div>
    </div>
  );
};

export default StartTest;
