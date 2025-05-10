import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const Navigate = useNavigate();
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [userExist, setuserExist] = useState("");

  let handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  let handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        email,
        password,
      });

      console.log("Signup success:", response.data);
      Navigate("/profile");
    } catch (error) {
      if (error.response) {
        setuserExist("user Already exists");
        console.error("Signup failed:", error.response.data.message);
      } else if (error.request) {
        console.error("No response from server.");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <h1>Sign up page</h1>
      <p>{userExist}</p>
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
        <Link to="/login"> already have an account</Link>
      </p>
    </>
  );
}

export default Signup;
