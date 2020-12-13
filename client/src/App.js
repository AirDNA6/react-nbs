import React from "react";
import "./App.css";
import {Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navigacija";
import Tabela from "./components/Tabela";


function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Container>
          <Tabela />
      </Container>
    </div>
  );
}

export default App;
