import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing(props) {
  const {
    precio,
    addProductCart,
    setRefreshCheckLogin,
    setProducts,
    productsCart,
    getProductsCart,
    products } = props;


  return (
    <>

      <Router>
        <Switch>
          {map(configRouting, (route, index) => (

            <Route key={index} path={route.path} exact={route.exact}>

              <route.page setRefreshCheckLogin={setRefreshCheckLogin}
                addProductCart={addProductCart}
                productsCart={productsCart}
                getProductsCart={getProductsCart}
                products={products}
                setProducts={setProducts}
                precio={precio}
              />

            </Route>
          ))}
        </Switch>
      </Router>

    </>
  )
}
