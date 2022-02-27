import React, { useState } from "react";
import "./Signup.css";
function Signup() {
  var [{ fname, lname, email, password }, setInput] = useState("");

  const inputChange = (e) => {
    setInput((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  const formSubmit = () => {
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    if (localStorage.getItem("accounts")) {
      let temp = JSON.parse(localStorage.getItem("accounts"));
      temp.push({
        email: email,
        firstName: fname,
        lastName: lname,
        password: password,
      });
      localStorage.setItem("accounts", JSON.stringify(temp));
      window.location.assign("/");
    } else {
      let temp = [
        {
          email: email,
          firstName: fname,
          lastName: lname,
          password: password,
        },
      ];
      localStorage.setItem("accounts", JSON.stringify(temp));
      window.location.assign("/");
    }
  };

  return (
    <section className="content2">
      <h2 style={{ textAlign: "center" }}>Signup</h2>
      <div className="form ui">
        <form className="signup" action="">
          <div className="field">
            <label htmlFor="">First Name:</label>
            <input
              name="fname"
              className="input"
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={inputChange}
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="">
              Last Name:
            </label>
            <input
              name="lname"
              className="input"
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={inputChange}
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="">
              Email:
            </label>
            <input
              name="email"
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={inputChange}
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="">
              Password:
            </label>
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={inputChange}
              required
            />
          </div>
          <input
            onClick={formSubmit}
            className="ui button button2"
            type="button"
            value="Signup"
          />
        </form>
      </div>
    </section>
  );
}

export default Signup;
