import React from "react";
import Dashboard from "./views/Common/Dashboard";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
}

export default App;
