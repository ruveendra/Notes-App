import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import ModalContent from "./UserDetails";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [indents, setindents] = useState([]);
  const [token, setToken] = useState("");
  const [pages, setPages] = useState();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    mobile: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onChangeInput = async (e) => {
    const { value } = e.target;
    if (value === "") {
      getUsers(token);
    }
    const searchTerm = value;
    console.log(value);
    setSearch(value);
    filterContent(searchTerm);
    // setErr("");
  };

  function filterContent(searchTerm) {
    // console.log(users)
    console.log(search);
    const result = users.filter((user) => {
      return user.email?.toLowerCase().trim().includes(searchTerm);
      //  console.log(user.email?.toLowerCase().includes(search) )
    });
    // const result = users
    // .map((user)=>(
    //   console.log(user)
    // ))
    setUsers(result);
  }
  const nextPage = async () => {
    if (currentPage > pages){
      setCurrentPage(currentPage-1);
      getUsers(token);
    }
    else{
      setCurrentPage(currentPage+1);
      getUsers(token);

    }

  };

  const previousPage = async () => {

    if (currentPage < 1){
      setCurrentPage(1);
      getUsers(token);
    }
    else{
      setCurrentPage(currentPage-1);
      getUsers(token);

    }

  };

  // function updatePage (){
    
  //   setCurrentPage(i);
  //   getUsers();
  // }; 
    
    
  

  const getUsers = async (token) => {
    const res = await axios.get(`/users/?page=${currentPage}&limit=5`, {
      headers: { Authorization: token },
    });
    setPages(res.data.pageCount);
    setUsers(res.data.results);
    
    
  };

  useEffect(() => {
    const num = 1
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      
      getUsers(num,token);
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
    console.log(show);
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

  const Pagination = async () => {
    
    for (var i = 0; i <= pages; i++) {
      indents.push(
        i
      )
      console.log(indents)
      // indents.push(
      //   <button type="button" class="page-btn" onClick ={()=>getUsers(i,token)} >
      //     {i+1}
      //   </button>
      // );
    }
    
  };

  return (
    <div>
      <form class="content-search" role="search">
        <input
          class="form-control me-2"
          type="search"
          name="search"
          placeholder="Search User"
          aria-label="Search"
          onChange={onChangeInput}
        />
        
      </form>

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
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.email}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    getDetails(
                      user?.firstName,
                      user?.lastName,
                      user?.email,
                      user?.dob,
                      user?.mobile
                    )
                  }
                  class="btn btn-secondary btn-sm"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show ? <ModalContent /> : null}
      
      
      <div>
        {/* {indents.map((j)=>(
        <button type="button" class="page-btn"  >
          {j+1}
        </button>


        ))} */}
      </div>
      
      <button type="button" class="content-button2 " onClick ={()=>nextPage()}>next</button>
      <div>
      <button type="button" class="content-button2" onClick ={()=>previousPage()}>previous</button>
      </div>

    </div>
  );
}

export default AdminHome;
// 
