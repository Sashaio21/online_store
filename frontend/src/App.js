import { render } from "react-dom";
import {  BrowserRouter as Router, Routes, Route, Switch  } from "react-router-dom";
import {Home} from './pages/Home';
import { PageFullProduct } from './pages/PageFullProduct';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { AddProduct } from './pages/AddProduct';
import { Profile } from './pages/Profile';
import { Header } from "./components/Header";
import { Admin } from './pages/Admin.js';
import { Basket } from "./pages/Basket.js";
import { useState } from "react";
import { fetchUserMe } from "./redux/slices/auth.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Orders } from "./pages/Orders.js";


export function App() {
  const [logUser, setLogUser] = useState(""); 
  const userDispatch = useDispatch();
  useEffect(()=>{
    userDispatch(fetchUserMe());
  },[])
    return (
      <>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home user={logUser}/>}/>
          <Route path="/product/:id" element={<PageFullProduct/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/login" element={<Login user={logUser} setUser={setLogUser}/>}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/add-product/:id/edit" element={<AddProduct/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/basket" element={<Basket/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </>
    );
  }
  