import { Link, Navigate } from "react-router-dom"
import { useEffect } from "react"
import './CardForAdmin.css'
import axios from '../axios';



export function CardForAdmin ({obj}){
    const data = { name: "John Doe", age: 30 };

    const deleteCard = (idProd) => {
        axios.delete(`products/${idProd}`);
    }

    const changeCard = (idProd) => {
        return <Navigate to={"/add-product"}></Navigate>   
    }


    return (
            <div key={obj._id} className='OneProductAdmin'>
                <img src={`http://localhost:4444/upload/${obj.urlImage}`} className='imageForOneProductsAdmin'/>
                <div className='dataProductAdmin'>
                    <div className='titleText'>{obj.price} BYN</div>
                    <div className='titleText'>{obj.title}</div>
                    <div className='descriptionText'>{obj.descriptionProduct}</div>
                    <div className="blockWithButton">
                        <Link to={`/add-product/${obj._id}/edit`}><div onClick={()=>changeCard(obj._id)} className='buttonBasketAdmin'>Изменить</div></Link>
                        <div onClick={()=>deleteCard(obj._id)} className='buttonBasketAdmin'>Удалить</div>
                    </div>
                    
                </div>
            </div>
    )
}