import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
