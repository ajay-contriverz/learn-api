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

function App() {
  return (
    <div className="App">
      <Nav />

      <h1>FrontEnd Portal</h1>
      <Routes>
        <Route exact path="/" element={<Products />}></Route>
        <Route path="/add" element={<AddProduct />}></Route>
        <Route path="/update" element={<UpdateProduct />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
