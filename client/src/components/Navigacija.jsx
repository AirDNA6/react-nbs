import React from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Navigacija() {
  return (
    <div>
      <Navbar expand="lg" 
      variant="light" 
      style={{backgroundColor: '#B1B1B1'}}
      >
        <Navbar.Brand href="/">
          <img
            width="150"
            height="80"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            src="https://lh3.googleusercontent.com/proxy/9t9ozFd9KqrCiG6uhyKct8KfWOVctqjOCHgThzi2_cx02Nd-rIgvdxpIZSxiOH6K4-vJ9BMOj8Gk1PnO"
          />
        </Navbar.Brand>
        <h2 >Trenutna kursna lista</h2>
      </Navbar>
    </div>
  );
}

export default Navigacija;
