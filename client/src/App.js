import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function App() {
  const [nbsList, setNbsList] = useState([]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setNbsList(response.data);
    });
  }, []);

  const handleUpdate = () => {
    setLoading(true);
    Axios.post("http://localhost:3001/api/insert").then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="App container">
      <h1>Kursna lista Narodne Banke Srbije</h1>
      <Button
        className="m-3"
        disabled={isLoading}
        onClick={!isLoading ? handleUpdate : null}
      >
        {" "}
        {isLoading ? "Loading..." : "Azuriraj"}
      </Button>
      <Table striped bordered hover responsive="md" variant="dark">
        <thead>
          <tr>
            <th>Valuta</th>
            <th>Kupovni</th>
            <th>Srednji</th>
            <th>Prodajni</th>
            <th>Datum</th>
          </tr>
        </thead>

        {nbsList.map((value) => {
          return (
            <tbody>
              <tr>
                <td style={{ textTransform: "uppercase" }}>{value.valuta}</td>
                <td>{value.kupovni}</td>
                <td>{value.srednji}</td>
                <td>{value.prodajni}</td>
                <td>{value.datum}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default App;
