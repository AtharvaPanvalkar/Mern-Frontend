import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Comp/Home";

import ProductPage from "./assets/Comp/ProductPage";
import SellerPage from "./assets/Comp/SellerPage";
import SellerAddProduct from "./assets/Comp/SellerAddProductPage";
import { Signin } from "./pages/Register";
import { Login } from "./pages/Login";
import Sellerform from "./pages/Sellerinfo"

import Homeseller from "./assets/Comp/Homeseller";
import Homeuser from "./assets/Comp/Homeuser";
import ProtectedRouteGenral from "./pages/Protected";
import ProductDetails from "./assets/Comp/ProductDetails";
import AdminPage from "./assets/Comp/Adminpage";
import Homeadminuser from "./assets/Comp/HomeAdmin";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/prodseller" element={<SellerPage />} />

        <Route path="/signup" element={<Signin />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/sellerinfo"
          element={
            <ProtectedRouteGenral allowedRoles={["Business Owner"]}>
              <Sellerform />
            </ProtectedRouteGenral>
          }
        />

        <Route
          path="/selleradd"
          element={
            <ProtectedRouteGenral allowedRoles={["Business Owner"]}>
              <SellerAddProduct />
            </ProtectedRouteGenral>
          }
        />
        <Route
          path="/Owner"
          element={
            <ProtectedRouteGenral allowedRoles={["Business Owner"]}>
              <Homeseller />
            </ProtectedRouteGenral>
          }
        />
        <Route
          path="/AdminHome"
          element={
            <ProtectedRouteGenral allowedRoles={["Admin"]}>
              <Homeadminuser />
            </ProtectedRouteGenral>
          }
        />
        <Route
          path="/Admin"
          element={
            <ProtectedRouteGenral allowedRoles={["Admin"]}>
              <AdminPage />
            </ProtectedRouteGenral>
          }
        />
        {/* <Route path="/product-details/:id" element={<ProductDetails />} /> */}
        <Route
          path="/product-details/:id"
          element={
            <ProtectedRouteGenral allowedRoles={["Business Owner"]}>
              <ProductDetails />
            </ProtectedRouteGenral>
          }
        />

        <Route
          path="/User"
          element={
            <ProtectedRouteGenral allowedRoles={["User"]}>
              <Homeuser />
            </ProtectedRouteGenral>
          }
        />
      </Routes>
    </Router>
  );
}
