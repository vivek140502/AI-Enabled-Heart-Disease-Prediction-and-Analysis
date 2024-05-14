import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginUser from "./Pages/Registration/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterUser from "./Pages/Registration/Register";
import Prediction from "./Pages/Prediction/Prediction";
import Page1 from "./Pages/Prediction/Page1";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route
          path="/page1"
          element={<Page1 src={"/20.png"} title={"Healthy Heart"} />}
        />
        <Route
          path="/page2"
          element={<Page1 src={"/17.jpg"} title={"Recovering Heart"} />}
        />
        <Route
          path="/page3"
          element={<Page1 src={"/18.jpg"} title={"Unhealthy Heart"} />}
        />
      </Routes>
    </>
  );
}

export default App;
