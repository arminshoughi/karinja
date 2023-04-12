import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Application from "./component/application";
import DetailApplly from "./component/detailapply";
import DetailJobCompany from "./component/detailJobCompany";

import PaginatedList from "./component/Home";

import Job from "./component/job";
import JobOfCompany from "./component/jobOfCompany";
import ListApply from "./component/listAplly";
import Login from "./component/Login";
import Navbar from "./component/Navbar";

import Sighnin from "./component/sighnin";

export const App = () => {
  const access = localStorage.getItem("access");
  return (
    <>
      {!!access ? (
        <Router>
          <div className="d-flex flex-row flex-nowrap h-100">
            {window.location.pathname.includes("login") ||
            window.location.pathname.includes("sighnin") ? (
              ""
            ) : (
          ""
            )}
            <div className="w-[2000rem] ms-auto">
              {window.location.pathname.includes("login") ||
              window.location.pathname.includes("sighnin") ? (
                ""
              ) : (
                <Navbar />
              )}

              <Routes>
                <Route path="/" element={<PaginatedList />} />
                <Route path="/company" element={<JobOfCompany />} />
                <Route
                  path="/company/:pageNumber"
                  element={<DetailJobCompany />}
                />
                <Route path="/:pageNumber" element={<Job />} />
                <Route
                  path="/requests/:pageNumber"
                  element={<DetailApplly />}
                />
                <Route path="/requests" element={<ListApply />} />
                <Route path="/company/apply/:pageNumber" element={<Application />} />

                <Route path="/login" element={<Login />} />
                <Route path="/sighnin" element={<Sighnin />} />
              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <Router>
          <div className="d-flex flex-row flex-nowrap h-100">
            {window.location.pathname.includes("login") ||
            window.location.pathname.includes("sighnin") ? (
              ""
            ) : (
""            )}
            <div className="w-75 ms-auto">
              {window.location.pathname.includes("login") ||
              window.location.pathname.includes("sighnin") ? (
                ""
              ) : (
                <Navbar />
              )}

              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </Router>
      )}
    </>
  );
};
