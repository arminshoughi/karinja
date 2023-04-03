import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCurrent } from '../hook/current'




const SideBar = () => { 
const {data}=useCurrent()
console.log("narges",data.username)

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark w-25 position-fixed bottom-0 top-0">
    <div className="pb-3">
        <div className="navbar-brand text-light">Finance</div>
        <hr />
    </div>
    
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <NavLink to="/" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>list of job</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/requests" className={({isActive}) => (isActive ? "active nav-link text-light" : 'nav-link text-light')}>requests</NavLink>
      </li>
    </ul>
    <hr />
    <div className="text-light">
    <i className="bi bi-person-fill me-2"></i>
        
        Logged in as: 
        <div className='text-center'>

        <div className="btn-group btn-group-sm" role="group">
            <button type="button" className="btn btn-secondary" disabled>{data.username}</button>
            <button onClick={()=>{localStorage.removeItem("access")
          window.location.href = "/login"

          }} type="button" className="btn btn-outline-secondary">log out</button>
        </div>
        </div>
    </div>
  </div>
  )
}

export default SideBar