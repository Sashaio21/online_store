import './Basket.css'
import { useState, useEffect } from 'react'
import axios from '../axios';
import { CardForBasket } from '../components/CardForBasket';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBasket } from '../redux/slices/basket';

export function Basket() {
    const basketDis = useDispatch();
    const {basket} = useSelector(state=>state.basket)
    const [sumbasket, setSum] = useState(0);
    const [itemsBasket, setItmesBasket] = useState([]);
    const data = ""
    const getBasket = async () =>{
        const dataBasket1 = await basketDis(fetchBasket());
        setItmesBasket(dataBasket1.payload);
    };

    console.log(Boolean(itemsBasket[0]))

    const buyBasket = ()=> {        
        axios.get("/orders")
        getBasket()
        getBasket()
        console.log("купил");
    }


    useEffect(()=>{
        getBasket();
      },[])

    return (
        <div className="basketBlock">
            <div className='itemsInCart'>
                <div className='titleBasket' >Корзина </div>
                {Boolean(itemsBasket[0]) ? (
                    <div className='productsBasketList'>
                    {itemsBasket.map((obj)=>
                    <CardForBasket obj={obj} itemsBasket={itemsBasket} setItmesBasket={setItmesBasket}/>)
                    }
                </div>
                ):(
                    <div>
                    </div>
                )
                }
            </div>
            <div className='infoBasket'>
                <div className='rowAlign'>
                    <div style={{fontSize: "30px"}}>Итого</div>
                    <div style={{fontSize: "30px"}}>{sumbasket} BYN</div>
                </div>
                <div className='rowAlign'>
                    <div >Количество товаров</div>
                    <div>{itemsBasket.length}</div>
                </div>
                <div className='rowAlign'>
                    <div>Доставка</div>
                    <div>Бесплатно</div>
                </div>
                <div className='buttonBuy' onClick={()=>buyBasket()}>
                    Оформить заказ
                </div>
            </div>
        </div>
    )
}