import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { FormContact } from '../components/formContact/FormContact'

function Contact() {

    const [verMas, setVerMas] = useState(false);
    const extraContent = (
        <>
           
            <span className="text-center text-md-start px-5 px-md-0 pe-md-5 ">Tambien puedes contactarnos a traves de nuestro email contactohulkstore@dc-marvel.com o con nuestro cel de la empresa +3816160165.</span>
        </>
    );
    const linkContent = verMas ? "<< Ver menos" : "Ver más >>";
    const verMasClick = (e) => {
        setVerMas(!verMas);
    };
    return (
        <div className="container-contact" >
            <Container>
                <section className="row  row-cols-1 row-cols-lg-2">
                    <div className="text-format d-flex flex-column aling-items-center align-items-md-start pb-0">
                        <h1>Contacta con Hulk Store</h1>
                        <h5 className=" px-5 px-md-0 pe-md-5">Mandanos un mensaje directo de nuestra page, llenando el formulario con tu email y un mensaje. Si es posible selecciona una de las opciones para saber que es lo que mas buscan nuestros clientes</h5>
                        {verMas && extraContent}
                        <p onClick={verMasClick} className="ver-mas">{linkContent}</p>
                    </div>
                    <Container className="m-auto">
                        <FormContact />
                    </Container>
                </section>
            </Container>
        </div>
    )
}

export default Contact