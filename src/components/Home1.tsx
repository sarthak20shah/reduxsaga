import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Home1() {
  return (
    <div className="nav bg-dark d-flex justify-content-right">
      <Link className="nav-link" to="/">
        {/* <Button
          className="btn btn-raised bg-light"
          // style={{ borderRadius: "50px", boxSizing: "border-box" }}
        > */}
        Home
        {/* </Button> */}
      </Link>

      <Link className="nav-link" to="/">
        {/* <Button
          className="btn btn-raised bg-light"
          // style={{ borderRadius: "50px", boxSizing: "border-box" }}
        > */}
        Sign Up
        {/* </Button> */}
      </Link>
      {/* <Link className="nav-link" to="/signup">
        Register
      </Link> */}
    </div>
  );
}

export default Home1;
