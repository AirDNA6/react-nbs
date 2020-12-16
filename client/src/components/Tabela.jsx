import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import '../Footer.css'

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
    
    //Renderuje nove podatke bez ponovnog ucitavanja
  }, [nbsList]);

  const handleUpdate = () => {
    setLoading(true);
    Axios.post("http://localhost:3001/api/insert");

    //Dodaje na vec postojecih 18 recorda
    //jos novih 18 recorda
    setNbsList([...nbsList]);
  };

  const handleDelete = () => {
    setLoading(true);

    Swal.fire({
      title: 'Da li ste sigurni da zelite da obrisete listu?',
      showCancelButton: true,
      confirmButtonText: `Obrisi`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios.delete("http://localhost:3001/api/delete")
        Swal.fire('Obrisano', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Otkazano', '', 'info')
      }
    })
  };

  return (
    <div className="content">
      <div className="content-inside">
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


          {nbsList.length !== 0 ? nbsList.map((value, myKey) => {
            return (
              <tbody key={myKey}>
                <tr>
                  <td style={{ textTransform: "uppercase" }}>{value.valuta}</td>
                  <td>{value.kupovni}</td>
                  <td>{value.srednji}</td>
                  <td>{value.prodajni}</td>
                  <td>{value.datum}</td>
                </tr>
              </tbody>
            );
          }) : <tbody><tr><td>Nema podataka</td></tr></tbody>}

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
          disabled={nbsList.length === 0 ? true : false}
          onClick={!isLoading ? handleDelete : null}>
          {" "}
          {isLoading ? "Loading..." : "Obrisi"}
        </Button>
      </div>
    </div>
  )
}

export default Tabela
