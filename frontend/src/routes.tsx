import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CreatePoint from "./pages/CreatePoint";
import Home from "./pages/Home";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
};

export default Routes;
