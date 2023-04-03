import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DetailApplly from "./component/detailapply";

import PaginatedList from "./component/Home";

import Job from "./component/job";
import ListApply from "./component/listAplly";
import Login from "./component/Login";
import Navbar from "./component/Navbar";

import SideBar from "./component/sidebar";
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
              <SideBar />
            )}
            <div className="w-75 ms-auto">
              {window.location.pathname.includes("login") ||
              window.location.pathname.includes("sighnin") ? (
                ""
              ) : (
                <Navbar />
              )}

              <Routes>
                <Route path="/" element={<PaginatedList />} />
                <Route path="/:pageNumber" element={<Job />} />
                <Route
                  path="/requests/:pageNumber"
                  element={<DetailApplly />}
                />

                <Route path="/requests" element={<ListApply />} />

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
              <SideBar />
            )}
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
