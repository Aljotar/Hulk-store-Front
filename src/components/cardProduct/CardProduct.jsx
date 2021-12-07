import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CardProduct = ({
  producto,
  favorites,
  setFavorites,
  cart,
  setCart,
  setShowSideCart,
}) => {
  const [cantBuy, setCantBuy] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [btnText, setBtnText] = useState("");

  // Funcion para para productos a favoritos
  const addFavorite = () => {
    setFavorites((favList) => favList.concat({ producto }));
  };
  const removeFavorite = () => {
    setFavorites((favList) =>
      favList.filter((fav) => fav.producto._id !== producto._id)
    );
  };
  const toggleFavorite = () => {
    const isFavored = favorites.some(
      (fav) => fav.producto._id === producto._id
    );
    if (isFavored) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };
  useEffect(() => {
    const isFavorites = favorites.some(
      (fav) => fav.producto._id === producto._id
    );
    if (isFavorites) {
      setIsFavorites(true);
    } else {
      setIsFavorites(false);
    }
  }, [favorites, producto]);

  // Funcion para productos al carrito
  const cantidad = 1;
  const addToCart = () => {
    setCart((cart) => cart.concat({ producto, cantidad }));
    setShowSideCart(true);
  };

  useEffect(() => {
    const inCart = cart.some(
      (productoCart) => productoCart.producto._id === producto._id
    );
    const outOfStock = producto.amount <= 0;
    if (inCart) setBtnText("Ya esta en el carrito")
    else if (outOfStock) setBtnText("Sin Stock")
    else setBtnText("Agregar al carrito")
    setCantBuy(inCart || outOfStock);
  }, [cart, producto]);

  return (
    <div className="productos mx-1 p-0">
      <Card as={Link} to={`/store/${producto._id}`} className="card-productos">
        <div className="mt-3 d-flex align-items-start justify-content-center tamaño-imagen">
          <Card.Img
            className="img-top-center"
            variant="top"
            src={producto.image}
          />
        </div>
        <Card.Body className="card-description">
          <Card.Title className="name-producto mt-1 text-center">
            {producto.name}
          </Card.Title>
          <Card.Text className="precio-producto mt-5 text-center">
            {producto.discount !== 0 ? (
              <s>`RRP: $ {producto.price}`</s>
            ) : (
              `Sin descuento`
            )}
          </Card.Text>
          <Card.Text className="text-center precio-producto-descuento">
            ${" "}
            {(
              producto.price -
              (producto.discount * producto.price) / 100
            ).toFixed(2)}
          </Card.Text>
          <Card.Text className="text-center">Por unidad</Card.Text>
        </Card.Body>
      </Card>
      <div className="d-flex align-items-center justify-content-center bg-white">
        <button
          disabled={cantBuy}
          className={
            cantBuy
              ? "col-9 responsive-cart-button-add"
              : "col-9 btn-general-style"
          }
          onClick={addToCart}
        >
          {btnText}
        </button>
        <button className="col-3 add-favorite-btn" onClick={toggleFavorite}>
          <FaHeart className={isFavorites ? "is-favorite" : "no-favorite"} />
        </button>
      </div>
    </div>
  );
};
