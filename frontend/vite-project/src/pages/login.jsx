import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const Navigate = useNavigate();
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

  let handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  let handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (response.data.message === "password is correct") {
        console.log("Login success:", response.data);
        Navigate("/profile");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("login failed:", error.response.data.message);
      } else if (error.request) {
        console.error("No response from server.");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <h1>login up page</h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor="email">Enter email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Enter passwrod</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br></br>
        <button type="submit">submit</button>
      </form>
      <p>
        <Link to="/signup"> dont have an account?</Link>
      </p>
    </>
  );
}

export default Login;
