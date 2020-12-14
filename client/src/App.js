import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navigacija";
import Tabela from "./components/Tabela";
import FooterPage from "./components/FooterPage"


function App() {

  return (
    <div className="App">
      <Navbar />
      <Container>
        <Tabela />
      </Container>
      <FooterPage />
    </div>
  );
}

export default App;
