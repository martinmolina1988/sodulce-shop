import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { STORAGE_PRODUCTS_CART } from "../../utils/constant";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray
} from "../../utils/arrayFunc";

import "./Cart.scss";
import { listaProductos } from "../../api/ProducsApi";
import { Link } from "react-router-dom";
import CheckOut from "./CheckOut";


export default function Cart(props) {
  const { productsCart, getProductsCart } = props;
  const [products, setProducts] = useState([])
  const [singelProductsCart, setSingelProductsCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    setSingelProductsCart(allProductsId);
  }, [productsCart]);


  useEffect(() => {

    listaProductos("precio", 1).then(response => {
      setProducts(response?.data)
    })
  }, [])

  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductsId = removeArrayDuplicates(productsCart);

    allProductsId.forEach(productId => {
      const quantity = countDuplicatesItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity
      };
      productData.push(productValue);
    });

    if (products) {
      products.forEach(product => {
        productData.forEach(item => {
          if (product._id === item.id) {
            const totalValue = product.precio * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }

    setCartTotalPrice(totalPrice);
  }, [productsCart, products]);





  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsCart();
  };

  const increaseQuantity = id => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
    getProductsCart();
  };

  const decreaseQuantity = id => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
    getProductsCart();
  };


  return (<>
    <div className="cart-content">
      <Link className="links" to="/"> ← Volver </Link>
      <CartContentHeader emptyCart={emptyCart} />
      <div className="cart-content__products">
        {singelProductsCart.map((idProductCart, index) => (
          < CartContentProducts
            key={index}
            products={products}
            idsProductsCart={productsCart}
            idProductCart={idProductCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
      </div>
      <CartContentFooter cartTotalPrice={cartTotalPrice} />
    </div>
  </>
  )

}

function CartContentHeader(props) {
  const { emptyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <h2>Carrito</h2>
      </div>

      <Button variant="link" onClick={emptyCart}>
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProducts(props) {
  const {
    products,
    idsProductsCart,
    idProductCart,
    increaseQuantity,
    decreaseQuantity
  } = props;
  if (products) {
    return products.map((product, index) => {
      if (idProductCart === product._id) {
        const quantity = countDuplicatesItemArray(product._id, idsProductsCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      }
    });
  }
  return null;
}

function RenderProduct(props) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;

  return (
    <div className="cart-content__product">
      <img src={product.imageURL} alt={product.producto} />
      <div className="cart-content__product-info">
        <div>
          <h3>{product.producto.substr(0, 25)}...</h3>
          <p>$<strong>{product.precio.toFixed(2)}</strong> / ud.</p>
        </div>
        <div>
          <p >En carro: <strong>{quantity} </strong>ud.</p>
          <div>
            <button onClick={() => increaseQuantity(product._id)}><strong> +</strong></button>
            <button className="danger" onClick={() => decreaseQuantity(product._id)}><strong>-</strong></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;

  return (<>
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado: </p>
        <p>${cartTotalPrice.toFixed(2)} </p>
      </div>
      {// <Button>Tramitar pedido</Button>
      }    <CheckOut cartTotalPrice={cartTotalPrice} className="button" />
    </div>
  </>);
}
