import React, { Suspense } from "react";
import Loadable from "react-loadable";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
// import FullPizza from "./pages/FullPizza";
// import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Идёт загрузка корзины...</div>,
});
const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"),
  loading: () => <div>Идёт загрузка пиццы...</div>,
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ "./pages/NotFound"),
  loading: () => <div>Загрузка...</div>,
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
