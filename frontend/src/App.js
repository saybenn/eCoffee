import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PortalScreen from "./screens/PortalScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShopScreen from "./screens/ShopScreen";
import BlogScreen from "./screens/BlogScreen";
import SingleBlogScreen from "./screens/SingleBlogScreen";
import ShippingScreen from "./screens/ShippingScreen";
import OrderReviewScreen from "./screens/OrderReviewScreen";
import ContactScreen from "./screens/ContactScreen";
import AboutScreen from "./screens/AboutScreen";
import OrderPayScreen from "./screens/OrderPayScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

const App = () => {
  const location = useLocation();
  const portalPage = location.pathname === "/portal";
  return (
    <>
      {!portalPage && <Header />}
      <main className="bg-light">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />{" "}
          <Route path="/portal" element={<PortalScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/blog" element={<BlogScreen />} />
          <Route path="/blog/:id" element={<SingleBlogScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route
            path="/admin/orderlist/:pageNumber"
            element={<OrderListScreen />}
          />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListScreen />}
          />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/order/review/:id" element={<OrderReviewScreen />} />
          <Route path="/order/:id" element={<OrderPayScreen />} />
          <Route path="/shop/search/:keyword" element={<ShopScreen />} exact />
          <Route path="/shop/page/:pageNumber" element={<ShopScreen />} exact />
          <Route
            path="/shop/search/:keyword/page/:pageNumber"
            element={<ShopScreen />}
            exact
          />
          <Route path="/shop" element={<ShopScreen />} exact />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>{" "}
      </main>
      {!portalPage && <Footer />}
    </>
  );
};

export default App;
