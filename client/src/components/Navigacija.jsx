import React from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './navigacija.css'

function Navigacija() {
  return (
    <div>
      <Navbar expand="lg"
        className="nav-op"
        variant="light" >
        <Navbar.Brand href="/">
          <img
            width="150"
            height="80"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            src="logonbs.png"
          />
        </Navbar.Brand>
        <h2 className="nav-text">Trenutna kursna lista</h2>
      </Navbar>
    </div>
  );
}

export default Navigacija;
