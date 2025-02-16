import axios from "axios";
import React, { useState } from "react";
import { Accordion, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { leerDeLocalStorage } from "../../utils/localStorage";

export const FormBuy = ({ user, cart }) => {
  const tokenLocal = leerDeLocalStorage("token") || {};
  const birthdayUser = new Date(user.birthday);
  const day = birthdayUser.getUTCDate();
  const month = birthdayUser.getUTCMonth();
  const year = birthdayUser.getUTCFullYear();
  const birthdayFormat = `${year}-${month + 1}-${day}`;

  // Validaciones reactBoot
  const [validated, setValidated] = useState(false);

  const [input, setInput] = useState({
    buyerEmail: user.email,
    buyerDate: birthdayFormat,
    buyerName: user.name,
    buyerLastName: user.lastName,
    buyerAddress1: "",
    buyerAddress2: "",
    buyerCity: "",
    buyerState: "",
    buyerZip: "",
    buyerShippingInstructions: "",
    buyerCardNumber: "",
    buyerCardName: "",
    buyerCardDate: "",
    buyerCardCode: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newInput = { ...input, [name]: value };
    setInput(newInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const newBuy = {
        buyerData: {
          buyerEmail: input.buyerEmail,
          buyerName: input.buyerName,
          buyerLastName: input.buyerLastName,
          buyerDate: input.buyerDate,
        },
        buyerShipping: {
          buyerAddress1: input.buyerAddress1,
          buyerAddress2: input.buyerAddress2,
          buyerCity: input.buyerCity,
          buyerState: input.buyerState,
          buyerZip: input.buyerZip,
          buyerShippingIntructions: input.buyerShippingInstructions,
        },
        buyerCard: {
          buyerCardNumber: input.buyerCardNumber,
          buyerCardCode: input.buyerCardCode,
          buyerCardName: input.buyerCardName,
          buyerCardDate: input.buyerCardDate,
        },
        productsList: cart.map((cartItem) => ({
          productId: cartItem.producto._id,
          quantity: cartItem.cantidad,
        })),
      };
      await axios.post(
        "https://hulkstore-server.herokuapp.com/api/ventas",
        newBuy
      );

      swal({
        title: "Compra Exitosa !",
        icon: "success",
      }).then(() => {
        localStorage.removeItem("cart");
        window.location.href = "/store";
        window.scrollTo(0, 150);
      });
    } catch (error) {
      console.error(error);
      if (error.response.data) {
        swal("Faltan datos", "Completar los campos obligatorios", "warning");
      } else {
        alert("error de conexion");
      }
    }

    setValidated(true);
    if (setValidated === true) {
      e.target.reset();
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 150);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="row row-cols-1">
        {!tokenLocal.token && (
          <Link
            to="/login"
            onClick={scrollToTop}
            className="my-3 text-decoration-none text-secondary text-center"
          >
            ¿Ya tiene una cuenta? Iniciar sesión
          </Link>
        )}
        <h5 className="mt-2">Informacion del Contacto</h5>
      </div>
      <Form.Group className="mb-3" controlId="validationCustom01">
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            type="email"
            name="buyerEmail"
            onChange={(e) => handleChange(e)}
            defaultValue={tokenLocal.token ? user.email : ""}
            maxLength="35"
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationCustom02">
        <h5 className="mt-2">Nacimiento</h5>
        <Form.Text className="text-muted">
          Para comprar debes ser mayor de edad
        </Form.Text>
        {tokenLocal.token ? (
          <Form.Control
            type="date"
            name="buyerDate"
            onChange={(e) => handleChange(e)}
            defaultValue={birthdayFormat}
            required
          />
        ) : (
          <Form.Control
            type="date"
            name="buyerDate"
            onChange={(e) => handleChange(e)}
            required
          />
        )}
        <Form.Control.Feedback type="invalid">
          Necesitamos validar tu edad
        </Form.Control.Feedback>
      </Form.Group>

      <h5 className="mt-2">Dirección de envio</h5>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom03">
          <FloatingLabel controlId="floatingName" label="Nombre">
            <Form.Control
              type="text"
              name="buyerName"
              onChange={(e) => handleChange(e)}
              defaultValue={tokenLocal.token ? user.name : ""}
              maxLength="20"
              required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Necesitamos tu Nombre
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom04">
          <FloatingLabel controlId="floatingLastName" label="Apellido">
            <Form.Control
              type="text"
              name="buyerLastName"
              onChange={(e) => handleChange(e)}
              defaultValue={tokenLocal.token ? user.lastName : ""}
              maxLength="20"
              required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Necesitamos tu Apellido
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="validationCustom05">
        <FloatingLabel controlId="floatingAddress1" label="Dirección">
          <Form.Control
            type="text"
            name="buyerAddress1"
            onChange={(e) => handleChange(e)}
            maxLength="35"
            required
          />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
          Dato Requerido
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationCustom06">
        <FloatingLabel
          controlId="floatingAddress2"
          label="Piso, departamento ..."
        >
          <Form.Control
            type="text"
            name="buyerAddress2"
            onChange={(e) => handleChange(e)}
            maxLength="10"
            required
          />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
          Dato Requerido
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <FloatingLabel controlId="floatingCity" label="Ciudad">
            <Form.Control
              type="text"
              name="buyerCity"
              onChange={(e) => handleChange(e)}
              maxLength="35"
              required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Dato Requerido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <FloatingLabel controlId="floatingState" label="Provincia">
            <Form.Control
              type="text"
              name="buyerState"
              onChange={(e) => handleChange(e)}
              maxLength="35"
              required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Dato Requerido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <FloatingLabel controlId="floatingZip" label="Codigo Postal">
            <Form.Control
              type="text"
              maxLength="4"
              name="buyerZip"
              onChange={(e) => handleChange(e)}
              required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Dato Requerido
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group
        className="mt-2 mb-3"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label>Instrucciones de entrega</Form.Label>
        <Form.Control
          as="textarea"
          maxLength="80"
          name="buyerShippingInstructions"
          onChange={(e) => handleChange(e)}
          rows={3}
        />
      </Form.Group>
      {/* Continuar Compra */}
      <Accordion className="mb-2">
        <Accordion.Item className="accordion-buy" eventKey="0">
          <Accordion.Header>Continuar</Accordion.Header>
          <Accordion.Body>
            <h5>Pago</h5>
            <Form.Text className="text-muted mb-1">
              Todas las transacciones son seguras y encriptadas.
            </Form.Text>
            <Form.Group className="mb-3" controlId="validationCustom07">
              <FloatingLabel
                controlId="floatingCardNumber"
                label="Numero de Tarjeta"
              >
                <Form.Control
                  type="number"
                  minLength="16"
                  maxLength="19"
                  name="buyerCardNumber"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Por Favor complete los datos de la tarjeta
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom08">
              <FloatingLabel
                controlId="floatingCardName"
                label="Nombre Titular"
              >
                <Form.Control
                  type="text"
                  maxLength="20"
                  name="buyerCardName"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Por Favor complete los datos de la tarjeta
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom10">
                <FloatingLabel
                  controlId="floatingCardDate"
                  label="Vencimiento (MMYY)"
                >
                  <Form.Control
                    type="number"
                    minLength="4"
                    maxLength="4"
                    name="buyerCardDate"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Fecha de Vencimiento Necesaria
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom10">
                <FloatingLabel
                  controlId="floatingCardCode"
                  label="Codigo de seguridad"
                >
                  <Form.Control
                    type="password"
                    maxLength="3"
                    minLength="3"
                    name="buyerCardCode"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Codigo de seguridad necesario
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {/* BOTON SUBMIT PARA COMPLETAR EL FORMULARIO*/}
            <button className="btn-general-style" type="submit">
              Comprar
            </button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Form>
  );
};
