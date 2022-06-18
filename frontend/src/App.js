import React from "react";
import "./styles/index.scss";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import MyRoutes from "./routes";
const App = () => {

  return (
      <BrowserRouter>
        <Routes>
            {MyRoutes}
        </Routes>
      </BrowserRouter>
  );
};

export default App;
