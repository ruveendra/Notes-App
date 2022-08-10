import React from "react";
import { Link } from "react-router-dom";

function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();

    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo1">
        <h1>
          <Link class="navbar" to="/">
            Notes{" "}
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link class="navbar" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/create" class="navbar">
            Create Note
          </Link>
        </li>
        <li onClick={logoutSubmit}>
          <Link class="navbar" to="/">
            Logout
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
