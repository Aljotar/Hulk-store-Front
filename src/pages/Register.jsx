import React, { useState } from 'react'
import { Container} from 'react-bootstrap'
import { FormRegister } from '../components/formRegister/FormRegister'

function Register() {

    const [verMas, setVerMas] = useState(false);
    const extraContent = (
        <>
           
           <h5 className="px-5 px-md-0 pe-md-5 ">REGÍSTRESE AHORA GRATIS y obtene descuentos en cada compra a través de nuestro Programa de Beneficios.</h5>
        </>
    );
    const linkContent = verMas ? "<< Ver menos" : "Ver más >>";
    const verMasClick = (e) => {
        setVerMas(!verMas);
    };
    return (
        <div className="container-register">
        <Container >
            <section className="row  row-cols-1 row-cols-lg-2">
                <div className=" text-format d-flex flex-column aling-items-center align-items-md-start pb-0 ">
                    <h1>Bienvenido a Hulk Store</h1>
                    <p className="px-5 px-md-0 pe-md-5">Únete gratis a Hulk Store y sé el primero en enterarte de nuestras mejores ofertas y nuevos lanzamientos.</p>
                    {verMas && extraContent}
                    <p onClick={verMasClick} className="ver-mas">{linkContent}</p>
                </div>
                <Container>
                  <FormRegister />
                </Container>
            </section>
        </Container>
        </div>
    )
}

export default Register