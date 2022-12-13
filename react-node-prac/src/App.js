import { Route, Routes } from "react-router";
import "./App.css";
import Nav from "./components/Nav";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp/SignUp";
import PrivateComp from "./components/PrivateComp/PrivateComp";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/" element={<Products />}></Route>
          <Route path="/add" element={<AddProduct />}></Route>
          <Route path="/update" element={<UpdateProduct />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
