import { useState } from "react";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
