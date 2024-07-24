import './Login.css'
import { Header } from '../components/Header'
import { useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectAuth } from '../redux/slices/auth';


export function Login ({user , setUser}) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const userDispatch = useDispatch();
    const auth = useSelector(selectAuth);

    const GetUser = async (phoneNumber, password) => {
        const dataAuth = {
            "phoneNumber": phoneNumber,
            "password": password
        }

        const dataUser = await userDispatch(fetchUser(dataAuth));

        if ('token' in dataUser.payload) {
            window.localStorage.setItem('token', dataUser.payload.token)
        }   
    }

    if (auth) {
        return <Navigate  to={"/"}/>        
    } 

    return (
        <div className='App'>
            <div className="mainBlock">
                <div>{user}</div>
                <div className="titleRegistration">Авторизация</div>
                <img src="../noavatar.png" className="imageNoavatar"/>
                <div className="inputs">
                    <input placeholder="Номер телефона" className="entryField" onChange={(event)=>setPhoneNumber(event.target.value)}></input>
                    <input placeholder="Парль" className="entryField" type='password' onChange={(event)=>setPassword(event.target.value)}></input>
                    <div onClick={()=>GetUser(phoneNumber, password)} className='buttonForRegistration'>Войти</div> 
                </div>
            </div>
        </div>
    )
}