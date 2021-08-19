import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Link, Route } from "react-router-dom";
import Ed from "./components/Ed";
import Head from "./components/Head";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import Addnew from "./components/Addnew";
import FinalTb from "./components/FinalTb";
import Home1 from "./components/Home1";
import BaseFormik from "./components/BaseFormik";

function App() {
  return (
    <>
      <ToastContainer />

      <Route path="/header" component={Head} exact />
      <Switch>
        <Route path="/" exact>
          <Home />
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Home1 />
          <Login />
        </Route>

        <Route path="/table" component={Ed} exact />
        <Route path="/signup" component={Signup} exact />

        <Route path="/addnew" component={Addnew} exact />
        <Route path="/base" exact component={BaseFormik} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
