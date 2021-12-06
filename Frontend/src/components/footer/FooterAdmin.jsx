import React from 'react'
import "./footer.css";
import { FaArrowUp } from 'react-icons/fa';

const FooterAdmin = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="mt-auto">
            <div className="d-flex align-items-center justify-content-between footer2">
                <div>
                    <p>© 2021 Derechos reservados Hulk Store</p>
                </div>
                <div>
                    <p>Universo DC/Marvel</p>
                </div>
                <div>
                    <button className="volverArriba" onClick={scrollToTop}><FaArrowUp /></button>
                </div>
            </div>
        </div>
    )
}

export default FooterAdmin
