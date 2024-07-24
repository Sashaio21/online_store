import { Link } from "react-router-dom"
import { useEffect } from "react"
import axios from '../axios';
import { useDispatch } from "react-redux";
import { fetchBasket } from "../redux/slices/basket";


export function ProductCard ({obj}){
    const basketDispatcher = useDispatch();

    const addProductBasket = async (idProduct) => {
        const count = {
            "count": 0
        }
        axios.post(`/basket/${idProduct}`, count)
        const dataBasket = await basketDispatcher(fetchBasket());
        console.log((dataBasket.payload)) 
    };

    return (
            <div key={obj._id} className='OneProduct'>
                <Link to={`/product/${obj._id}`}>
                    <img src={`http://localhost:4444/upload/${obj.urlImage}`} className='imageForOneProducts'/>
                </Link>
                <div className='dataProduct'>
                    <Link to={`/product/${obj._id}`}>
                        <div className='titleText'>{obj.price} BYN</div>
                        <div className='titleText'>{obj.title}</div>
                        <div className='descriptionText'>{obj.descriptionProduct}</div>
                    </Link>
                    <div onClick={()=>addProductBasket(obj._id)} className='buttonBasket'>В корзину</div>
                </div>
            </div>
    )
}