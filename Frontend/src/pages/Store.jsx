import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardProductos from "../components/CardProductos";
import Filtros from "../components/Filtros";
import "../App.css";
import SliderProductos from "../components/SliderProductos";
import Carrito from "../components/Carrito";

function Store() {
  let productos = [
    {
      id: "1",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/OLG301492_x400.png",
      descricion: "NV Marcel Martin Tete du Cuvee Cremant de Loire",
      precioLista: "$42.99",
      precioConDescuento: "$24.99",
    },
    {
      id: "2",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/ITM44936-2018DandelionLion_sDenShiraz_x400.png",
      descricion: "2018 Dandelion Lion's Den Shiraz",
      precioLista: "$40.00",
      precioConDescuento: "$20.99",
    },
    {
      id: "2",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/ENG__Prosecco_Brut_Doc_Treviso_x400.png",
      descricion: "NV Masottina Prosecco DOC Brut",
      precioLista: "$29.99",
      precioConDescuento: "$15.99",
    },

    {
      id: "2",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/ITM23706_Blue_Pyrenees_Estate_Section_26_Cabernet_Sauvignon_2016_x400.png",
      descricion: "2017 Blue Pyrenees Estate Sección 26 Cabernet Sauvignon",
      precioLista: "$34.99",
      precioConDescuento: "$19.99",
    },
    {
      id: "1",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/OLG301492_x400.png",
      descricion: "NV Marcel Martin Tete du Cuvee Cremant de Loire",
      precioLista: "$42.99",
      precioConDescuento: "$24.99",
    },
    {
      id: "2",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/ITM44936-2018DandelionLion_sDenShiraz_x400.png",
      descricion: "2018 Dandelion Lion's Den Shiraz",
      precioLista: "$40.00",
      precioConDescuento: "$20.99",
    },
    {
      id: "2",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/ENG__Prosecco_Brut_Doc_Treviso_x400.png",
      descricion: "NV Masottina Prosecco DOC Brut",
      precioLista: "$29.99",
      precioConDescuento: "$15.99",
    },

    {
      id: "2",
      img: "https://cdn.shopify.com/s/files/1/1504/5726/products/ITM23706_Blue_Pyrenees_Estate_Section_26_Cabernet_Sauvignon_2016_x400.png",
      descricion: "2017 Blue Pyrenees Estate Sección 26 Cabernet Sauvignon",
      precioLista: "$34.99",
      precioConDescuento: "$19.99",
    },
  ];

  return (
    <>
      <Row>
        <Col className="col-12 col-md-3  columnaFiltros">
          <Filtros />
        </Col>
        <Col className="col-12 col-md-9 columnaProductos p-0">
          <CardProductos productos={productos} />
        </Col>
      </Row>
      <Container className="mt-5">
        <SliderProductos />
      </Container>
      <Carrito className="position-fixed" />
    </>
  );
}

export default Store;
