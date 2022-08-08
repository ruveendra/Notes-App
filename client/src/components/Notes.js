import React from "react";
import Header from "./notes/Nav";
import Home from "./notes/Home";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

 function Notes({setIsLogin}) {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin}/>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/create" element={<CreateNote />} exact />
            <Route path="/edit/:id" element={<EditNote />} exact />
          </Routes>
      </div>
    </Router>
  );
}

export default Notes
