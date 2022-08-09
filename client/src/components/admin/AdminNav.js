import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Link} from 'react-router-dom'

 function AdminNav({setIsLogin,setIsAdmin}) {

    const logoutSubmit = () =>{
        localStorage.clear()
        
        setIsLogin(false);
        setIsAdmin(false);
    }
  return (

    <header>
            <div className="logo1">
                <h1><Link class = "navbar" to="/">Notes </Link></h1>
            </div>
            <ul>
                <li><Link class = "navbar" to="/">Home</Link></li>
                <li><Link to="/users/register" class = "navbar">Register User</Link></li>
                <li onClick={logoutSubmit}  ><Link  class = "navbar" to="/">Logout</Link></li>
            </ul>
        </header>

//     <header>
//     <div className="logo">
//         <h1><Link to="/">Dev Notes</Link></h1>
//     </div>
//     <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/users/register">Register User</Link></li>
//         <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
//     </ul>
// </header>
    
  );
}

export default AdminNav