import './PageFullProduct.css'
import { Header } from '../components/Header'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

export function PageFullProduct() {
    const [dataOneProduct, setProduct] = useState({});

    const params = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:4444/products/${params.id}`)
        .then((data)=>{
            setProduct(data.data);
        });
    },[]);

    return (
        <div className='App'>
            <div className='MainContainer'>
                <img src='korm.png' style={{width: "350px"}}/>
                <div className='data'>
                    <div className='info'>
                        <div className='titleFullProduct'>{dataOneProduct.title}</div>
                        <div className='descriptionFullProduct'>{dataOneProduct.descriptionProduct}</div>
                    </div>
                </div>
                <div className='forBasket'>
                    <div className='priceForFullProduct'>{dataOneProduct.price} BYN</div>
                    <div onClick={()=>console.log(dataOneProduct)} className='buttonBasketForFullProduct'>В корзину</div>        
                </div>
            </div>
        </div>
    )
}