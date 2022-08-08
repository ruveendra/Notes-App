import React from "react";
import Header from "./admin/AdminNav";
import AdminHome from "./admin/AdminHome";
import RegisterUser from "./admin/RegisterUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

 function Admin({setIsLogin,setIsAdmin}) {
  return (

    
    <Router>
    <div className="notes-page">
      <Header setIsLogin={setIsLogin} setIsAdmin={setIsAdmin}/>
        <Routes>
          <Route path="/" element={<AdminHome />} exact />
          <Route path="/users/register" element={<RegisterUser />} exact />
          {/* <Route path="/edit/:id" element={<EditNote />} exact /> */}
        </Routes>
    </div>
  </Router>
    
  );
}

export default Admin