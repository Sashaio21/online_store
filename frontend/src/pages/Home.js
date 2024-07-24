import logo from '../logo.svg';
import './Home.css';
import { ProductCard } from '../components/ProductCard';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectAdmin } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';


export function Home({user}) {
  const [items, setData] = useState([]);
  const auth = useSelector(selectAdmin);

  
  useEffect(()=>{
    const data = axios.get('http://localhost:4444/products')
    .then(({data})=>{
      setData(data);
    });
  },[])
  
  try {
    console.log(auth.user) 
    if (auth.user == "admin") {
      return <Navigate to={"/admin"}></Navigate>
    }
  } catch (error) {
  }
  
  return (
    <div className='App'>
      <div>{user}</div>
      <div className="ListProducts">
        {items.map((obj)=>
    <ProductCard obj={obj}/>)}
      </div>
    </div>
  );
}

