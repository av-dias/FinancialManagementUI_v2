import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Moviments from "./pages/Moviments";
import Splits from "./pages/Splits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Moviments" element={<Moviments />} />
        <Route path="/Splits" element={<Splits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
