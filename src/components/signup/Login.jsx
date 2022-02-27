import React, { useState } from "react";
import "./Signup.css";

function Login() {
  var [{ email, password }, setInput] = useState("");

  const inputChange = (e) => {
    setInput((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  const formSubmit = () => {
    var accounts = JSON.parse(localStorage.getItem("accounts"));
    var check = false;
    accounts.map((ele) => {
      if (ele.email === email && ele.password === password) {
        check = true;
        var fname = ele.firstName;
        var lname = ele.lastName;
        localStorage.setItem("fname", fname);
        localStorage.setItem("lname", lname);
      }
    });
    if (check) {
      localStorage.setItem("email", email);
      window.location.assign("/");
    } else {
      alert("Invalid User Name or Password");
    }
  };

  return (
    <section className="content2">
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <div className="form ui">
        <form className="signup" action="">
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
            value="Login"
          />
          {/* <input className="clear" type="button" value="Clear" onClick={Clear} /> */}
        </form>
      </div>
    </section>
  );
}

export default Login;
