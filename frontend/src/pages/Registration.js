import { Header } from "../components/Header";
import './Registration.css'
import { useState } from "react";
import axios from "axios";

export function Registration() {
    const [surName, setSurName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [password, setPassword] = useState("");
    const [delivery_address, setDelivery_address] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const registrUsers = (surName, firstName, password, delivery_address, phoneNumber)=> {
        const dataRegistr = {
            "surName": surName ,
            "firstName": firstName ,
            "delivery_address": delivery_address ,
            "phoneNumber": phoneNumber ,
            "password": password ,
        }

        axios.post('http://localhost:4444/auth/register', dataRegistr);

        console.log(dataRegistr)
    }


    return (
        <div className="App">
            <div className="mainBlock">
                <div className="titleRegistration">Регистрация</div>
                <img src="noavatar.png" className="imageNoavatar"/>
                <div className="inputs">
                    <input placeholder="Фамилия" className="entryField" onChange={(event)=>setSurName(event.target.value)}></input>
                    <input placeholder="Имя" className="entryField" onChange={(event)=>setfirstName(event.target.value)}></input>
                    <input placeholder="Номер телефона" className="entryField" onChange={(event)=>setPhoneNumber(event.target.value)}></input>
                    <input placeholder="Придумайте пароль" type='password' className="entryField" onChange={(event)=>setPassword(event.target.value)}></input>
                    <input placeholder="Повторите пароль" type='password' className="entryField"></input>
                    <input placeholder="Адрес доставки" className="entryField" onChange={(event)=>setDelivery_address(event.target.value)}></input>
                    <div onClick={()=>registrUsers(surName, firstName, password, delivery_address, phoneNumber)} className='buttonForRegistration'>Зарегистрироваться</div> 
                </div>
            </div>
        </div>
    )
}