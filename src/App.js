import React, { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import { isUserLogedApi } from './api/auth';
import Routing from "./routes/Routing";
import { STORAGE_PRODUCTS_CART } from "./utils/constant";
import { AuthContext } from "./utils/contexts";


export default function App() {

  /*Carro de compras*/

  const [products, setProducts] = useState([])
  //En este estado se guardan los productos agregados al carrito de compras
  const [productsCart, setProductsCart] = useState([]);


  // Calculo el precio total para figurarlo en el carrito
  let precio = 0;
  productsCart.forEach(productCart => {
    products.forEach(product => {
      if (product._id === productCart) {
        precio = precio + product.precio;
      }
    })
  });



  useEffect(() => {

    // Cargan los productos al cargar la pagina
    getProductsCart();
  }, []);

  // Funcion que busca los produstos que estan en el carrito en el local storage
  const getProductsCart = () => {

    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);

    // Si hay productos en el LocalStorage se separa el string en "," y se guarda productsCart
    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  // Funcion que agrega productos al carrito mediante el local storage
  const addProductCart = (id, name) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsCart();
  };

  /*-----------------------------------------------*/

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);
  useEffect(async () => {

    await setUser(isUserLogedApi());
    setLoadUser(true);
  }, [refreshCheckLogin])


  return (<AuthContext.Provider value={user} >

    <><Routing setRefreshCheckLogin={setRefreshCheckLogin}
      addProductCart={addProductCart}
      productsCart={productsCart}
      getProductsCart={getProductsCart}
      products={products}
      setProducts={setProducts}
      precio={precio}
    /> </>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange={false}
      draggable
      pauseOnHover={false}
    />
  </AuthContext.Provider>
  );
}

