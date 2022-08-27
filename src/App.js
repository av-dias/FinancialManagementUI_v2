import "./App.css";
import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Moviments from "./pages/Moviments";
import Splits from "./pages/Splits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Moviments" element={<Moviments />} />
        <Route path="/Splits" element={<Splits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
