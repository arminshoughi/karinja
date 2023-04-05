import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiBell } from "react-icons/hi";
import { useCurrent } from "../hook/current";
import { HiUser } from "react-icons/hi";
import { Modal, Button, Form } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
  const [show, setShow] = useState(false);
  const { data } = useCurrent();
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (location.pathname === "/") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [location.pathname]);

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
              <p class="text-gray-600">
              website: {data?.website}
              </p>
              <p class="text-gray-600">
              establishment: {data?.establishment }
              </p>
              
              
              
              <div class="space-y-4 mb-6 mt-10">
                <h4 class="text-xl font-semibold">About the Company</h4>
                <p class="text-gray-600">{data?.about}</p>
              </div>
              <div class="flex justify-between mb-4">
              
             
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(!show)} className="btn btn-danger">
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
