import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserAuth from "../Pages/UserAuth";
import Home from "../Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
