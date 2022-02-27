import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
export class Header extends Component {
  logout = () => {
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("email");
    window.location.href = "http://localhost:3000/Home";
  };

  render() {
    return (
      <div className="navbar">
        <ul className="navbar-items">
          <li className="nav-item1">
            <a href="/">Home</a>
          </li>
          <li
            style={
              localStorage.getItem("fname")
                ? { display: "none" }
                : { display: "" }
            }
            className="nav-item2"
          >
            <a href="/Login">Login</a>
          </li>
          <li
            style={
              localStorage.getItem("fname")
                ? { display: "none" }
                : { display: "" }
            }
            className="nav-item2"
          >
            <a href="/Signup">Sign Up</a>
          </li>
          <li
            style={
              localStorage.getItem("email")
                ? { display: "" }
                : { display: "none" }
            }
            className="nav-item2"
          >
            <a href="" onClick={this.logout}>
              Logout
            </a>
          </li>
          <li
            style={
              localStorage.getItem("email")
                ? { display: "" }
                : { display: "none" }
            }
            className="nav-item2"
          >
            <a href="/Signup">
              {" "}
              {localStorage.getItem("email")
                ? localStorage.getItem("fname")
                : ""}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
