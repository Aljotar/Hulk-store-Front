import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductFullScreen } from "../components/productFullScreen/ProductFullScreen";

const DetailsProduct = ({productos, cart, setCart}) => {
    const [producto, setProducto] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        const getProducto = async () => {
            const response = await axios.get(
                `https://hulkstore-server.herokuapp.com/api/productos/${productId}`
            );
            setProducto(response.data);
        }
        getProducto();
    }, [productId]);

    return (
        <>
            <div>
                <ProductFullScreen producto={producto} cart={cart} setCart={setCart}  />
            </div>
        </>
    );
};

export default DetailsProduct;