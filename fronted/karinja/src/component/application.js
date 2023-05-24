import React, { useState, useEffect } from "react";
import axios from "axios";
import { useJob } from "../hook/job";
import { useApply } from "../hook/apply";
import { useRequest } from "../hook/request";
import { useApplication } from "../hook/application";
import { Modal, Button } from "react-bootstrap";

function Application() {
  const { data } = useApplication();
  const [modale, setModale] = useState(false);
  const [status, setStatus] = useState();
  const [a, setA] = useState();

  const access = localStorage.getItem("access");
  console.log(
    data.find((i) => i.id === a),
    "sdsadasd"
  );
console.log(data , "dddddd")
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8001/api/jobs/company/${
          window.location.pathname.split("/")[3]
        }/change_status/${a}/`,
        {
          status: Number(status),
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
      .then((result) => {})
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
    setModale(false)
  };

  return data.length === 0 ? <div className="bg-red-200 text-center h-20 !p-5">No item found</div>:data.map((data) => (
    <>
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="flex justify-between items-start border-b-2 pb-4 mb-4">
          <h2 class="text-xl font-bold">
            {data?.user.first_name + "  " + data?.user.last_name}
          </h2>
        </div>
        <div class="flex items-center space-x-4 mb-6">
          {data.user?.avatar ? (
            <img
              src={data.user?.avatar}
              alt={data.user?.username}
              class="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div class="w-12 h-12 rounded-full bg-gray-200"></div>
          )}
          <div>
            <h4 class="text-xl font-semibold">{data.user?.username}</h4>
          </div>
        </div>
        <div class="flex items-center justify-between border-b-2 pb-4 mb-4">
          <p class="text-sm text-gray-600">Monthly</p>
        </div>
        <div class="space-y-4 mb-6">
          <h4 class="text-xl font-semibold">user Description</h4>
          <p class="text-gray-600">{data.user?.about}</p>

          <p class="text-gray-600">address : {data.user?.address}</p>
          <p class="text-gray-600">birthday : {data.user?.birthday}</p>
          <p class="text-gray-600">experiences : {data.user?.experiences}</p>
          <p class="text-gray-600">languages : {data.user?.languages}</p>
          <p class="text-gray-600">mobile : {data.user?.mobile}</p>
          <p class="text-gray-600">
            national_code : {data.user?.national_code}
          </p>
        </div>
        <div class="space-y-4 mb-6">
          <h4 class="text-xl font-semibold">Required Skills</h4>
          <ul class="list-disc list-inside text-gray-600">
            {data?.user.skills
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
          <p class="text-gray-600">{data.user?.educations}</p>
        </div>
        <div class="space-y-4 mb-6">
          <h4 class="text-xl font-semibold">About the Company</h4>
          <p class="text-gray-600">{data.user?.about}</p>
        </div>
        <div class="flex justify-between mb-4">
          <p class="text-gray-600">
            Sex: {data.user?.sex === 1 ? "Male" : "Female"}
          </p>
          <p class="text-gray-600">
            Military Status:
            {data.user?.military_status === 0
              ? "Concluded"
              : data.user?.military_status === 1
              ? "Done"
              : data.user?.military_status === 2
              ? "Exempt"
              : "No Matter"}
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            onClick={() => {
              setModale(true);
              setA(data.id);
            }}
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            change Status
          </button>
        </div>
      </div>
      <Modal show={modale}>
        <Modal.Header
          closeButton
          onClick={() => setModale(!modale)}
        ></Modal.Header>
        <Modal.Body>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="accountType"
            >
              Type
            </label>
            <div class="ml-3 mt-1">
              <div class="flex items-center mb-2">
                <input
                  class="form-radio h-4 w-4 text-indigo-600"
                  type="radio"
                  name="accountType"
                  value="0"
                  id="full-time"
                  checked={status === "0"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label
                  class="ml-2 block text-gray-900 font-medium"
                  for="full-time"
                >
                  Initial
                </label>
              </div>

              <div class="flex items-center mb-2">
                <input
                  class="form-radio h-4 w-4 text-indigo-600"
                  type="radio"
                  name="accountType"
                  value="1"
                  id="part-time"
                  checked={status === "1"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label
                  class="ml-2 block text-gray-900 font-medium"
                  for="part-time"
                >
                  Pending
                </label>
              </div>

              <div class="flex items-center mb-2">
                <input
                  class="form-radio h-4 w-4 text-indigo-600"
                  type="radio"
                  name="accountType"
                  value="2"
                  id="remote"
                  checked={status === "2"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label
                  class="ml-2 block text-gray-900 font-medium"
                  for="remote"
                >
                  Accept
                </label>
              </div>
              <div class="flex items-center mb-2">
                <input
                  class="form-radio h-4 w-4 text-indigo-600"
                  type="radio"
                  name="accountType"
                  value="3"
                  id="remote"
                  checked={status === "3"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label
                  class="ml-2 block text-gray-900 font-medium"
                  for="remote"
                >
                  Reject
                </label>
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn mt-2 btn-primary">
            Submit
          </button>
        </Modal.Body>
      </Modal>
    </>
  ));
}
export default Application;
