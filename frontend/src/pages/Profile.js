import { Header } from "../components/Header"
import './Profile.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUserData } from "../redux/slices/auth"
import { fetchUserMe, fetchUser, logout } from "../redux/slices/auth"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { selectAuth } from "../redux/slices/auth"

export function Profile () {

    const {userData} = useSelector(state=>state.auth)
    const auth = useSelector(selectAuth);
    const userDispatsh = useDispatch() 
    // userDispatsh(fetchUserMe());

    
    console.log("auth", auth)
    const clickRemoveToken = () => {
        if (window.confirm("Вы хотите выйти?")) {
            window.localStorage.removeItem('token');
            // usersDispatch(logout());
        }
    }

    useEffect(()=>{
        console.log("effect")
    },[])

    console.log("fewef", auth)

    // if (!auth) {
    //     return <Navigate to={"/"}></Navigate>
    // }


    console.log("5")
    
    return (
        <div className="App">
            <div className="mainBlockProfile">
                <div className="titleRegistration">Профиль</div>
                <img src="../noavatar.png" className="imageNoavatarForProfile"/>
                <div className="profileData">
                    <div>Полное имя: {userData.user.surName} {userData.user.firstName}</div>
                    <div>Номер телефона: {userData.user.phoneNumber}</div>
                    <div>Адрес доставки: {userData.user.delivery_address}</div>
                    <div onClick={()=>console.log("Товар добавлен в корзину")} className='buttonEditProfile'>Изменить профиль</div> 
                    <div onClick={()=> clickRemoveToken()} className='buttonEditProfile'>Выйти</div> 
                </div>
            </div>
        </div>
    )
}