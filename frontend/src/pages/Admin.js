import { Header } from "../components/Header"
import './Admin.css'
import { ProductCard } from "../components/ProductCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { CardForAdmin } from "../components/CardForAdmin"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/slices/auth"
import { fetchUser } from "../redux/slices/auth"

export function Admin () {
    const [dataAdmin, setDataAdmin] = useState([]);
    
    const {userData} = useSelector(state=>state.auth)
    const usersDispatch = useDispatch();

    const clickRemoveToken = () => {
        if (window.confirm("Вы хотите выйти?")) {
            window.localStorage.removeItem('token');
        }
    }


    console.log(userData)

    useEffect(()=>{
        axios.get('http://localhost:4444/products')
        .then(({data})=>{
            setDataAdmin(data);
        });
      },[])

    return (
        <div className="App">
            <div className="mainBlockAdmin">
                <div className="titleRegistration">Администраторская панель</div>
                <img src="../noavatar.png" className="imageNoavatarForProfileAdmin"/>
                <div className="profileDataAdmin"> 
                <Link to={"/add-product"}>
                    <div onClick={()=>console.log("Товар добавлен в корзину")} className='buttonEditProfile'>Добавить товар</div> 
                </Link>
                <Link to={"/orders"}>
                    <div onClick={()=>console.log("Товар добавлен в корзину")}  className='buttonEditProfile'>Список заказов</div>
                </Link> 
                <Link>
                    <div onClick={()=>clickRemoveToken()} className='buttonEditProfile'>Выйти</div>
                </Link> 
                </div>
            </div>
            <div className="ListProductsAdmin">
                {dataAdmin.map((obj)=>
                <CardForAdmin obj={obj}/>)
                }
            </div>
        </div>
    )
}