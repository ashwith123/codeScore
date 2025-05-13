import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);

  let handelLogout = () => {
    console.log("logged out sucessfully");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found. Redirecting...");
      return navigate("/login");
    }

    axios
      .get("http://localhost:8080/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCurrUser(response.data.user);
      })
      .catch((error) => {
        console.error("Token invalid or expired. Redirecting...");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (!currUser) {
    return <p>Loading user info...</p>;
  }

  return (
    <>
      <h1>Current User Info</h1>
      <p>username: {currUser.username}</p>
      <p>ID: {currUser._id}</p>
      <p>Email: {currUser.email}</p>

      <button type="submit" onClick={handelLogout}>
        logot
      </button>
    </>
  );
}

export default Profile;
