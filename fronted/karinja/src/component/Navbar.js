import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCurrent } from "../hook/current";
import { HiUser } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { useMassage } from "../hook/message";
import { useSenter } from "../hook/sender";

const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
  const [show, setShow] = useState(false);
  const [chat, setChat] = useState(false);
  const [sender, setSender] = useState();

  const { data: message } = useMassage();
  const results  = useSenter(sender);
  const [selectedMessage, setSelectedMessage] = useState(null);
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

  const messages = [
    { usernane: "John Doe" },
    { usernane: "Jane Smith" },
    { usernane: "Bob Johnson" },
  ];
  console.log(results.data.results  , "asds");
  return (
    <>
      <div className="container-fluid px-md-5">
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

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <ul className="list-group"></ul>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={() => setShow(!show)}>
          <Modal.Title> profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.typ === 1 ? (
            <div class="bg-white rounded-lg shadow-md p-8">
              <div class="flex justify-between items-start border-b-2 pb-4 mb-4">
                <h2 class="text-xl font-bold">{data?.username}</h2>
              </div>
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
                  <h4 class="text-xl font-semibold">{data?.last_name}</h4>
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
                <p class="text-gray-600">{data?.educations}</p>
                <p class="text-gray-600">{data?.experiences}</p>
              </div>
              <div class="space-y-4 mb-6">
                <h4 class="text-xl font-semibold">About the {data.username}</h4>
                <p class="text-gray-600">{data?.about}</p>
              </div>
              <p class="text-gray-600">
                Sex: {data?.sex === 1 ? "Male" : "Female"}
              </p>

              <p class="text-gray-600">Old: {data?.old}</p>
              <p class="text-gray-600">national_code: {data?.national_code}</p>
              <p class="text-gray-600">mobile: {data?.mobile}</p>
              <p class="text-gray-600">languages: {data?.languages}</p>
              <div class="space-y-4 mb-6">
                <h4 class="text-xl font-semibold">about {data.username}</h4>
                <p class="text-gray-600">{data?.about}</p>
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
          <Button onClick={() => setShow(!show)} className="btn btn-danger">
            Close Modal
          </Button>
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
                          class="w-12 h-12 rounded-full object-cover"
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
          <Button onClick={() => setChat(!chat)} className="btn btn-danger">
            Close Modal
          </Button>
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
          <Modal.Title> chats with {results.data.results?.map(i =>i.sender)[0].username}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">{results.data.results?.map(i =>
          <div className={`${i.sender.id === 3 ? "bg-green-500 mt-2 rounded-lg  w-96":"bg-red-500 w-96  mt-2 ml-20 rounded-lg"}`}>{i.body}</div>
          )}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setSelectedMessage(!selectedMessage)}
            className="btn btn-danger"
          >
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
