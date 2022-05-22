import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     
      
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
       <nav className ="navbar navbar-expand-lg navbar-light bg-info">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><h1><b>Travel Circle</b></h1></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#"><b>Home</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link "><b>Packeges</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link "><b>Category</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link "><b>Payments</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link "><b>Contact Us</b></a>
        </li>
      </ul>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               <b>Create New Category</b>
             </NavLink>
           </li>
         </ul>
       </div>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               <b>Feedback</b>
             </NavLink>
           </li>
         </ul>
       </div>
    </div>
  </div>
</nav>
      
</div>
 );
}