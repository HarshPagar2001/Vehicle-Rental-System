import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./admin/dashboard/Dashboard";
import AdminLogin from "./admin/pages/adminlogin/Login";
import GetVehicle from "./admin/pages/getvehicle/GetVehicle";
import AdminVehicle from "./admin/pages/adminvehicle/AdminVehicle";
import EditVehicleItem from "./admin/components/edititem/EditVehicleItem";
import ViewOrderItem from "./admin/components/vieworderitem/ViewOrderItem";
import ViewUserItem from "./admin/components/viewuseritem/ViewUserItem";
import GetUser from "./admin/pages/getuser/GetUser";
import AdminUser from "./admin/pages/adminuser/AdminUser";
import EditUserItem from "./admin/components/edititem/EditVehicleItem";
import Contact from "./pages/contact/Contact";
import List from "./pages/list/List";
import Vehicle from "./pages/vehicle/Vehicle";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import Password from "./pages/password/Password";
import Orders from "./admin/pages/orders/Orders";
import Redirect from "./pages/redirect/Redirect";
import Payment from "./pages/payment/Payment";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode === true ? "DarkMode" : "LightMode"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/vehicle"
            element={<GetVehicle />} />
          <Route path="/admin/dashboard/vehicle/create"
            element={<AdminVehicle />} />
          <Route path="/admin/dashboard/vehicles/:id"
            element={<EditVehicleItem />} />
          <Route path="/admin/dashboard/user"
            element={<GetUser />} />
          <Route path="/admin/dashboard/user/create"
            element={<AdminUser />} />
          <Route path="/admin/dashboard/users/:id"
            element={<EditUserItem />} />
          <Route path="/admin/dashboard/orders" element={<Orders />} />
          <Route path="/admin/dashboard/orders/:id"
            element={<ViewOrderItem />} />
          <Route path="/admin/dashboard/user/:id"
            element={<ViewUserItem />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/password" element={<Password />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vehicles" element={<List />} />
          <Route path="/vehicles/:id" element={<Vehicle />} />
          <Route path="/vehicles/payment/:id" element={<Payment />} />
          <Route path="/vehicles/payment/:id/redirect"
            element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
