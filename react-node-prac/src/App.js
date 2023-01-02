import { Route, Routes } from "react-router";
import "./App.css";
import Nav from "./components/Nav";
import Products from "./components/products/Products";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp/SignUp";
import PrivateComp from "./components/PrivateComp/PrivateComp";
import Login from "./components/login/Login";
import Movies from "./components/Movies";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/" element={<Products />}></Route>
          <Route path="/add" element={<AddProduct />}></Route>
          <Route path="/update/:id" element={<UpdateProduct />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
        </Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
