import { Button } from "@mui/material";
import { getAllSubject, requestTest } from "../../../axios/api";
import React, { useEffect, useState } from "react";
import { toaster } from "../../../components/toaster/toaster";

const Subject = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    try {
      const resp = await getAllSubject();
      console.log("response is this", resp);
      if (resp.data.error) {
        throw new Error(resp.data.message);
      }
      setSubjectData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const scheduleTest = async (subjectId) => {
    try {
      const resp = await requestTest({
        subjectId: subjectId,
      });
      console.log("create test ", resp);
      if (resp.data.error) {
        throw new Error(resp.data.message);
      }
      toaster.successToast("Test approval has been sent");
    } catch (error) {
      console.log(error.message);
      toaster.errorToast(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-4">
      <div>
        {subjectData.length > 0 ? (
          <div className="flex flex-row gap-3">
            {subjectData[0].subject.map((val, index) => {
              console.log("val isi tis ", val);
              return (
                <div
                  key={val._id}
                  className="flex h-[10rem] w-[14rem] flex-col items-center justify-center rounded-xl bg-white"
                >
                  <text className="mb-2">{val.name}</text>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => {
                      scheduleTest(val._id);
                    }}
                  >
                    Schedule Test
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Subject;
