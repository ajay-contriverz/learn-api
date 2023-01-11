import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NoPage from "./pages/404";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = localStorage.getItem("userData");
    if (!currentUser) {
      return navigate("/");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="dashboard/edit-product/:id" element={<EditProduct />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
