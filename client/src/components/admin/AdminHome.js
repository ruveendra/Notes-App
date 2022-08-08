import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import ModalContent from "./UserDetails";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    mobile: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUsers = async (token) => {
    const res = await axios.get("/users", {
      headers: { Authorization: token },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getUsers(token);
    }
  }, []);

  const getDetails = async (firstName, LastName, email, dob, mobile) => {
    setUser({
      firstName: firstName,
      lastName: LastName,
      enail: email,
      dob: dob,
      mobile: mobile,
    });
    handleShow();
    console.log(show)
    console.log(user.firstName);
  };

  const ModalContent = () => {
    return (
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>First Name: {user.firstName}</h4>
          <h4>Last Name: {user.lastName}</h4>
          <h4>Email: {user.email}</h4>
          <h4>Date of Birth: {user.dob}</h4>
          <h4>Mobile: {user.mobile}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
    );
  };

  return (
    
    <div>
     
      <table class="content-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr class="active-row">
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    getDetails(
                      user.firstName,
                      user.LastName,
                      user.email,
                      user.dob,
                      user.mobile
                    )
                  }
                  class="btn btn-secondary btn-sm"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {/* <tr>
    <td>1</td>
    <td>Domenic</td>
    <td>88,110</td>
    <td>dcode</td>
  </tr>
  <tr class="active-row">
    <td>2</td>
    <td>Sally</td>
    <td>72,400</td>
    <td>Students</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Nick</td>
    <td>52,300</td>
    <td>dcode</td>
  </tr> */}
        </tbody>
      </table>
      {show ? <ModalContent/> : null}
      
     
      
    </div>
  );
}

export default AdminHome;
