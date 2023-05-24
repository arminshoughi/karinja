import React, { useState, useEffect } from "react";
import axios from "axios";
import { useApplyJob, } from "../hook/job";
import { Button } from "react-bootstrap";

function DetailApplly() {
  const { data } = useApplyJob();
  const [send, setSend] = useState();
  const access = localStorage.getItem("access");
  const [change, setChange] = useState(false);

  const handleSubmit = (e) => {
setSend("")
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8001/api/messenger/",
        {
          
            receiver_id: window.location.pathname.split("/")[2],
            body: send,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${access}`,
            "X-CSRFToken":
              "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
          },
        }
      )
      .then((result) => {
        setChange(!change)
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
  };
  const handleUndo = (e) => {
    axios
    .delete(`http://127.0.0.1:8001/api/jobs/employee/${window.location.pathname.split("/")[2]}/` , {

          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      )
      .then((result) => {
        window.location.href = "/requests"
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
  };


  return (
    <div class="bg-white rounded-lg shadow-md p-8">
      <div class="flex justify-between items-start border-b-2 pb-4 mb-4">
        <h2 class="text-xl font-bold">{data?.title}</h2>
        <h3 class="text-lg font-semibold">{data?.category?.title}</h3>
      </div>
      <div class="flex items-center space-x-4 mb-6">
        {data.company?.avatar ? (
          <img
            src={data?.company?.avatar}
            alt={data?.company?.name_en}
            class="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div class="w-12 h-12 rounded-full bg-gray-200"></div>
        )}
        <div>
          <h4 class="text-xl font-semibold">{data?.company?.name_en}</h4>
          <p class="text-gray-600">{data?.company?.address}</p>
        </div>
      </div>
      <div class="flex items-center justify-between border-b-2 pb-4 mb-4">
        <p class="text-lg font-semibold">{data?.salary} $</p>
        <p class="text-sm text-gray-600">Monthly</p>
      </div>
      <div class="space-y-4 mb-6">
        <h4 class="text-xl font-semibold">Job Description</h4>
        <p class="text-gray-600">{data?.description}</p>
      </div>
      <div class="space-y-4 mb-6">
        <h4 class="text-xl font-semibold">Required Skills</h4>
        <ul class="list-disc list-inside text-gray-600">
          {data?.skills
            ?.replace("[", "")
            ?.replace("]", " ")
            ?.replace("[", " ")
            ?.replaceAll("'", "")
            ?.split(",")
            .map((i) => i?.replaceAll(" ", ","))}
        </ul>
      </div>
      <div class="space-y-4 mb-6">
        <h4 class="text-xl font-semibold">Required Documents</h4>
        <p class="text-gray-600">{data?.educations}</p>
      </div>
      <div class="space-y-4 mb-6">
        <h4 class="text-xl font-semibold">About the Company</h4>
        <p class="text-gray-600">{data?.about}</p>
      </div>
      <div class="flex justify-between mb-4">
        <p class="text-gray-600">Sex: {data?.sex === 1 ? "Male" : "Female"}</p>
        <p class="text-gray-600">
          Military Status:
          {data?.military_status === 0
            ? "Concluded"
            : data?.military_status === 1
            ? "Done"
            : data?.military_status === 2
            ? "Exempt"
            : "No Matter"}
        </p>
      </div>
      <div className="flex mb-10 mt">
        {" "}
        <input
        value={send}
          onChange={(e) => setSend(e.target.value)}
          type="text"
          className=" py-2 ml-5 w-full mr-10 px-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your message here"
        ></input>
        <Button onClick={handleSubmit} className="btn btn-success w-28 ">
          send
        </Button>
      </div>
      <div class="flex items-center space-x-4">
        <button
          onClick={handleUndo}
          class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          undo
        </button>
      </div>
    </div>
  );
}
export default DetailApplly;
