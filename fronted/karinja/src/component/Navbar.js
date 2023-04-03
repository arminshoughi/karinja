import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiBell } from "react-icons/hi";
import { useCurrent } from "../hook/current";




const Navbar = () => {
  const location = useLocation();
  const [filter, setFilter] = useState(false);
 

  

  useEffect(() => {
    if (location.pathname === "/") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-light h-20" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid px-md-5">
        <button
          className="btn  position-relative"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <div className="flex">
           
          </div>
        </button>

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
        
          <ul className="list-group">
</ul>





        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
