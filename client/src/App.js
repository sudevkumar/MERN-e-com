import { Routes, Route } from "react-router-dom";
import AdminRoute from "./components/routes/AdminRoutes";
import PrivateRoute from "./components/routes/PrivateRoutes";
import About from "./pages/About";
import AdminDashBoard from "./pages/AdminDashBoard";
import Contact from "./pages/Contact";
import CreareProduct from "./pages/CreareProduct";
import CreateCategory from "./pages/CreateCategory";
import Dashboard from "./pages/Dashboard";
import Forget from "./pages/Forget";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Policy from "./pages/Policy";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashBoard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreareProduct />} />
        <Route path="admin/users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<Forget />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
