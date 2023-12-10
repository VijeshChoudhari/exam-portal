import { Button } from "@mui/material";
import { toaster } from "../../components/toaster/toaster";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStartTestToken, testRequestInfo } from "../../axios/api";

const Exam = () => {
  const param = useParams();
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();

  const startTest = async () => {
    try {
      const resp = await getStartTestToken(param.testRequestId);
      if (resp.data.error) {
        throw new Error(resp.data.messsage);
      }
      navigate(`${resp.data.data.token}`);
    } catch (error) {}
  };

  const checkIsLinkValid = async () => {
    try {
      const resp = await testRequestInfo(param.testRequestId);
      if (resp.data.error) {
        throw new Error(resp.data.message);
      }
      setIsExpired(resp.data.data.expired);
    } catch (error) {
      console.log(error);
      setIsExpired(true);
      toaster.errorToast(error.message || "something");
    }
  };

  useEffect(() => {
    checkIsLinkValid();
  }, []);

  return (
    <div className="p-3 ">
      {!isExpired ? (
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-bold">{param.subjectName}</div>
            <div>
              <Button variant="contained" type="button" onClick={() => {}}>
                Start Test
              </Button>
            </div>
          </div>
          <div className="mt-5 w-fit rounded-xl bg-orange-100 p-3">
            <p>Duration: The exam lasts 60 minutes.</p>
            <p> Submission: You can't close the exam without submitting.</p>
            <p> Attempts: You have 3 chances to pass. </p>
            <p> Passing: Score 70% to pass. </p>
            <p>
              {" "}
              Certificate: A passing score gets a certificate via email within
              72 hours.{" "}
            </p>
            <p> Integrity: Cheating is strictly prohibited.</p>
            <p> Support: Contact us for technical issues or questions.</p>
          </div>
        </div>
      ) : (
        <div>Link has been expired</div>
      )}
    </div>
  );
};

export default Exam;
