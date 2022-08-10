import React, { useState } from "react";
import axios from "axios";

function RegisterUser({ setIsLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      if (user.password != user.confirmPassword) {
        setErr("Password Does not match");
        console.log("123");
        setIsLoading(false);
      } else {
        const res = await axios.post("/users/register", {
          email: user.email,
          password: user.password,
        });
        setUser({ name: "", email: "", password: "", confirmPassword: "" });
        setErr(res.data.msg);
        setIsLoading(false);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
      setIsLoading(false);
    }
  };
  return (
    <div class="center">
      <h2>Register Student</h2>
      <form onSubmit={registerSubmit}>
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
        {/* <div class="pass">Forgot Password?</div> */}
        <h5>{err}</h5>
        <input
          type="submit"
          value={isLoading ? "Please Wait..." : "Register"}
        />
      </form>
    </div>
  );
}

export default RegisterUser;
