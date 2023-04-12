import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCurrent } from "../hook/current";
import { HiUser } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { useMassage } from "../hook/message";
import { useSenter } from "../hook/sender";
import { Link, NavLink } from "react-router-dom";
import { AiFillWechat } from "react-icons/ai";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
  const [show, setShow] = useState(false);
  const [chat, setChat] = useState(false);
  const [sender, setSender] = useState();
  const [change, setChange] = useState(false);

  const access = localStorage.getItem("access");

  const { data: message } = useMassage();
  const results = useSenter(sender , change);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [send, setSend] = useState();
  const { data } = useCurrent();
  const handleShow = () => setShow(true);
  const handleChat = () => setChat(true);
  useEffect(() => {
    if (location.pathname === "/") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [location.pathname]);
  function handleClick(message) {
    setSender(message.id);
    setSelectedMessage(true);
  }


  const handleSubmit = (e) => {
    setChange(!change)

    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8001/api/messenger/",
        {
          
            receiver_id: results.data.results?.map((i) => i.sender)[0].id,
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


  return (
    <>
      <div className="container-fluid flex px-md-5">
        <button
          className="btn  position-relative"
          type="button"
          onClick={handleShow}
        >
          <div className="flex ">
            <HiUser className="!w-10 text-red-600 !h-10" />
            <span className="ml-3 mt-3">{data?.username}</span>
          </div>
        </button>
        <button
          className="btn  position-relative"
          type="button"
          onClick={handleChat}
        >
          <div className="flex ">
            <AiOutlineMessage className="!w-10 mt-1 text-red-600 !h-10" />
            <span className="ml-3 mt-3">chats</span>
          </div>
        </button>
        {data.typ === 2 ? (
          <button className="nav nav-pills flex mb-auto mt-3 ml-20">
            <div className="nav-item">
              <NavLink
                to="/company"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link text-red-500"
                    : "nav-link  text-red-500"
                }
              >
                list of company job
              </NavLink>
            </div>
          
          </button>
        ) : (
          <button className="nav nav-pills flex mb-auto mt-3 ml-20">
            <div className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link text-red-500"
                    : "nav-link  text-red-500"
                }
              >
                list of job
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink
                to="/requests"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-link  text-red-500"
                    : "nav-link  text-red-500"
                }
              >
                requests
              </NavLink>
            </div>
          </button>
        )}

        <div className="text-light"></div>
        <div className="w-[70%]  grid justify-items-end">
          <div className="flex mt-3">
            <div className="mt-1">Logged in as:</div>
            <div className="text-center ml-5">
              <div className="btn-group btn-group-sm" role="group">
                <button type="button" className="btn btn-secondary" disabled>
                  {data.username}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("access");
                    window.location.href = "/login";
                  }}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={() => setShow(!show)}>
          <Modal.Title> 
            Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.typ === 1 ? (
            <div class="bg-white rounded-lg shadow-md p-8">
              
              <div class="flex items-center space-x-4 mb-6">
                {data.company?.avatar ? (
                  <img
                    src={data?.avatar}
                    alt={data?.last_name}
                    class="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                )}
                <div>
                  <h4 class="text-xl font-semibold">{data?.username + " " +data?.last_name}</h4>
                  <p class="text-gray-600">{data?.address}</p>
                </div>
              </div>

              <div class="space-y-4 mb-6">
                <h4 class="text-xl font-semibold">Skills</h4>
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
                <h4 class="text-xl font-semibold">Documents</h4>
                <p class="text-gray-600 ml-3">{data?.educations}</p>
                <p class="text-gray-600 ml-3" >{data?.experiences}</p>
              </div>
              <div class="space-y-4 mb-6">
                <h4 class="text-xl font-semibold">About the {data.username}</h4>
                <p class="text-gray-600 ml-3">{data?.about}</p>
              </div>
              <p class="text-gray-600 ml-3">
                Sex: {data?.sex === 1 ? "Male" : "Female"}
              </p>

              <p class="text-gray-600 ml-3">Old: {data?.old}</p>
              <p class="text-gray-600 ml-3">national_code: {data?.national_code}</p>
              <p class="text-gray-600 ml-3">mobile: {data?.mobile}</p>
              <p class="text-gray-600 ml-3">languages: {data?.languages}</p>
              <div class="space-y-4 mb-6 ">
                <h4 class="text-xl font-semibold">about {data.username}</h4>
                <p class="text-gray-600 ">{data?.about}</p>
              </div>
            </div>
          ) : (
            <div class="bg-white rounded-lg shadow-md p-8">
              <div class="flex justify-between items-start border-b-2 pb-4 mb-4">
                <h2 class="text-xl font-bold">{data?.username}</h2>
              </div>
              <div class="flex items-center space-x-4 mb-6">
                {data?.avatar ? (
                  <img
                    src={data?.avatar}
                    alt={data?.name_en}
                    class="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                )}
                <div>
                  <p class="text-gray-600">{data?.address}</p>
                </div>
              </div>
              <p class="text-gray-600">website: {data?.website}</p>
              <p class="text-gray-600">establishment: {data?.establishment}</p>

              <div class="space-y-4 mb-6 mt-10">
                <h4 class="text-xl font-semibold">About the Company</h4>
                <p class="text-gray-600">{data?.about}</p>
              </div>
              <div class="flex justify-between mb-4"></div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>

      <Modal class="!h-[50rem] !w-[90rem] ml-[40rem] mt-40" show={chat}>
        <Modal.Header closeButton onClick={() => setChat(!chat)}>
          <Modal.Title> chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="bg-gray-100 p-4">
            <h2 class="text-2xl font-bold mb-4">Inbox</h2>
            <table class="w-full">
              <thead>
                <tr>
                  <th class="px-4 py-2 border-b-2 border-gray-300 font-medium text-left">
                    From
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  new Set(
                    message.results?.map((i) => i.sender)?.map(JSON.stringify)
                  ),
                  JSON.parse
                )?.map((message, index) => (
                  <tr
                    key={index}
                    class="hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleClick(message)}
                  >
                    <td class="flex items-center py-4 border-b border-gray-300">
                      <div class="flex items-center space-x-4 mb-6">
                        <img
                          src={data?.avatar}
                          alt={data?.name_en}
                          class="w-12 h-06 rounded-full object-cover"
                        />

                        <div>
                          <p class="text-gray-600">{data?.address}</p>
                        </div>
                      </div>
                      <div>
                        <p class="font-medium">{message.username}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>

      <Modal
        class="!h-[50rem] !w-[90rem] ml-[40rem] mt-40"
        show={selectedMessage}
      >
        <Modal.Header
          closeButton
          onClick={() => setSelectedMessage(!selectedMessage)}
        >
          <Modal.Title>
            chats with {results.data.results?.map((i) => i.sender)[0]?.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[30rem] overflow-y-scroll">
          {results.data.results?.map((i) => (
            <div
              className={`${
                i.sender.id === data?.id
                  ? "bg-green-500 mt-2 rounded-lg  w-96" 
                  :  "bg-red-500 w-96  mt-2 ml-20 rounded-lg"
              }`}
            >
              {i.body}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex">
            <span className=" ">
              <AiFillWechat className="h-10 w-10" />
            </span>
            <input
              onChange={(e) => setSend(e.target.value)}
              type="text"
              className=" py-2 ml-5 w-[25rem] px-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your message here"
            ></input>
          </div>
          <Button onClick={handleSubmit} className="btn btn-success w-28">
            send
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
