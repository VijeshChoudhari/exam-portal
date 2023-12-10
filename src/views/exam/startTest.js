import { useNavigate, useParams } from "react-router-dom";
import { createReport, getTestQuestions, isValidLink } from "../../axios/api";
import React, { useEffect, useState } from "react";
import { toaster } from "../../components/toaster/toaster";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import moment from "moment";

const StartTest = () => {
  const [expired, setExpired] = useState(false);
  const [seconds, setSeconds] = useState(3600);
  const [loading, setLoading] = useState(true);
  const [testDetail, setTestDetail] = useState();
  const [questions, setQuestions] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const token = param.token;

  const getQuestions = async (testId) => {
    try {
      const resp = await getTestQuestions(testId);
      console.log(resp);
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
      navigate("/admin/");
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
      if (resp.data.expStatus) {
        getQuestions(resp.data.data.testId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      <div>
        {!expired ? (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitTest();
              }}
            >
              {questions.length > 0 &&
                questions.map((val, index) => {
                  return (
                    <div>
                      <h4>{index + 1}</h4>
                      <p>{val.question}</p>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={val.options[0]}
                        onChange={(e) => {
                          setQuestions((prev) => {
                            let updated = [...prev];
                            updated[index] = {
                              ...updated[index],
                              responseAns: e.target.value,
                            };
                          });
                        }}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          required
                          value={val.options[0]}
                          control={<Radio />}
                          label={val.options[0]}
                        />
                        <FormControlLabel
                          required
                          value={val.options[1]}
                          control={<Radio />}
                          label={val.options[1]}
                        />
                        <FormControlLabel
                          required
                          value={val.options[2]}
                          control={<Radio />}
                          label={val.options[2]}
                        />
                        <FormControlLabel
                          required
                          value={val.options[3]}
                          control={<Radio />}
                          label={val.options[3]}
                        />
                      </RadioGroup>
                    </div>
                  );
                })}
              <div>
                <Button variant="contained">Submit</Button>
              </div>
            </form>
          </div>
        ) : (
          <div>Test Link expired</div>
        )}
      </div>
    </div>
  );
};

export default StartTest;
