import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLogin, setIsAdmin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
  });
  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  const updateAccountSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("tokenStore");

    if (user.newPassword != user.confirmPassword) {
      setErr("Password didn't match");
    } else {
      try {
        if (token) {
          const { firstName, lastName, dob, mobile, newPassword } = user;
          const updateUser = {
            firstName,
            lastName,
            dob,
            mobile,
            newPassword,
          };
          console.log(updateUser);
          const res = await axios.put("/users/update", updateUser, {
            headers: { Authorization: token },
          });
          setErr(res.data.msg);
          logoutSubmit();
          setOnLogin(false);
          setUser({
            firstName: "",
            lastName: "",
            dob: "",
            newPassword: "",
            confirmPassword: "",
            mobile: "",
          });
        }
      } catch (err) {
        err.response.data.msg && setErr(err.response.data.msg);
      }
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      if (
        res.data.payload.status &&
        res.data.payload.accountType === "student"
      ) {
        setOnLogin(true);
        setIsLoading(false);
      } else if (
        res.data.payload.status == false &&
        res.data.payload.accountType === "admin"
      ) {
        setIsAdmin(true);
        setIsLogin(true);
        setIsLoading(false);
      } else {
        console.log(res.data.payload.status);
        console.log(res.data.payload.accountType);

        setIsLogin(true);
        setIsLoading(false);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
      setIsLoading(false);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <section className="login-page">
      <div class="center">
        <h1>Login</h1>
        <form onSubmit={loginSubmit}>
          <div class="txt_field">
            <input
              type="email"
              required
              name="email"
              id="login-email"
              value={user.email}
              onChange={onChangeInput}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              name="password"
              id="login-password"
              required
              value={user.password}
              autoComplete="true"
              onChange={onChangeInput}
            />
            <span></span>
            <label>Password</label>
          </div>

          <h5>{err}</h5>
          <input type="submit" value={isLoading ? "Please Wait..." : "Login"} />
        </form>
      </div>

      <div class="center" style={style}>
        <h4>Enter Your Information</h4>
        <form onSubmit={updateAccountSubmit}>
          <div class="txt_field">
            <input
              type="text"
              name="firstName"
              id="First-name"
              value={user.firstName}
              onChange={onChangeInput}
              required
            />
            <span></span>
            <label>First Name</label>
          </div>
          <div class="txt_field">
            <input
              type="text"
              name="lastName"
              id="Last-name"
              value={user.lastName}
              onChange={onChangeInput}
              required
            />
            <span></span>
            <label>Last Name</label>
          </div>

          <div className="txt_field">
            <input
              type="date"
              id="date"
              name="date"
              onChange={onChangeInput}
              value={user.dob}
            />
            <label>Date </label>
          </div>
          <div class="txt_field">
            <input
              type="text"
              maxLength={10}
              required
              name="mobile"
              id="mobile"
              value={user.mobile}
              onChange={onChangeInput}
              maxlength="10"
            />
            <span></span>
            <label>Mobile</label>
          </div>

          <div class="txt_field">
            <input
              type="password"
              name="newPassword"
              id="register-password"
              required
              value={user.newPassword}
              autoComplete="true"
              onChange={onChangeInput}
            />
            <span></span>
            <label>Enter New Password</label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              name="confirmPassword"
              id="login-confirmPassword"
              required
              value={user.confirmPassword}
              autoComplete="false"
              onChange={onChangeInput}
            />
            <span></span>
            <label>Confirm Password</label>
          </div>

          <h5>{err}</h5>
          <input type="submit" value={isLoading ? "Please Wait..." : "Save"} />
          <div class="signup_link">Update you account Information</div>
        </form>
      </div>
    </section>
  );
}

export default Login;
