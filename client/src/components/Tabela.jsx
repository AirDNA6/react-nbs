import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function Tabela() {
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

  const handleDelete = () => {
    setLoading(true);
    Axios.delete("http://localhost:3001/api/delete");
    alert("Jesi siguran?")
    window.location.reload();
  };

  return (
    <div>
        <Table striped bordered hover responsive="md" variant="dark" className="mt-5">
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

        <Button
          className="m-3"
          disabled={isLoading}
          onClick={!isLoading ? handleUpdate : null}>
          {" "}
          {isLoading ? "Loading..." : "Azuriraj"}
        </Button>

        <Button
          className="m-3 btn-danger"
          disabled={isLoading}
          onClick={!isLoading ? handleDelete : null}>
          {" "}
          {isLoading ? "Loading..." : "Obrisi"}
        </Button>
    </div>
  )
}

export default Tabela
