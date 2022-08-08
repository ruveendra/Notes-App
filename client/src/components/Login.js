import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLogin, setIsAdmin }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    password: "",
    newPassword:"",
    email: "",

  });
  const [err, setErr] = useState("");
  const onChangeInput = (e) => {
  const { name, value } = e.target;
  setUser({ ...user, [name]: value });
  setErr("");
  };

  const logoutSubmit = () =>{
    localStorage.clear()
    setIsLogin(false)
}
  const updateAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const {firstName, lastName, dob, mobile, newPassword} = user;
        const updateUser = {
            firstName, lastName, dob, mobile, newPassword
        }
        console.log(updateUser)
        const res = await axios.put("/users/update",updateUser, {
          headers: {Authorization: token},
        });
        setErr(res.data.msg);
        logoutSubmit();
        setOnLogin(false);
        setUser({ firstName: "", lastName: "", dob: "",newPassword:""}); //set timer
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      if (res.data.payload.status && res.data.payload.accountType === "student" ) {
        setOnLogin(true);
      } 
      else if (res.data.payload.status==false && res.data.payload.accountType === "admin"){
        setIsAdmin(true);
        setIsLogin(true);
      }
      
      else {
        
        setIsLogin(true);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <section className="login-page">
      <div className="login create-note">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="true"
            onChange={onChangeInput}
          />

          <button type="submit">Login</button>
          <p>
            You don't have an account?
            <span onClick={() => setOnLogin(true)}> Register Now</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
      <div className="register create-note" style={style}>
        <h2>Enter Your Information</h2>
        <form onSubmit={updateAccountSubmit}>
          <input
            type="text"
            name="firstName"
            id="First-name"
            placeholder="First Name"
            required
            value={user.firstName}
            onChange={onChangeInput}
          />

          <input
            type="text"
            name="lastName"
            id="Last-name"
            placeholder="Last Name"
            required
            value={user.lastName}
            onChange={onChangeInput}
          />

          <input
            type="date"
            id="date"
            name="dob"
            onChange={onChangeInput}
            value={user.dob}
          />

          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile"
            required
            value={user.mobile}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="newPassword"
            id="register-password"
            placeholder="New Password"
            required
            value={user.newPassword}
            autoComplete="true"
            onChange={onChangeInput}
          />

          <button type="submit">Save</button>
          <p>
            Get started by entering your account details.
            {/* <span onClick={() => setOnLogin(false)}> Login Now</span> */}
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
}

export default Login;
