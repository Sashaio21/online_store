import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchOrder } from "../redux/slices/order"
import "./Orders.css"
import axios from '../axios';


export function Orders() {
    const itemOrders = [1, 2, 3, 4]
    const itemProduct = [1, 2, 5]
    const [orders, setOrders] = useState([]);
    const orderDis = useDispatch();


    const getBasket = async () =>{
        const dataBasket1 = await orderDis(fetchOrder());
        setOrders(dataBasket1.payload.allOrders);
    };

    const getMaxPrice = () => {
        axios.get('/orders/maxPriceCheck')
        .then(({data})=>{
            setOrders(data.allOrders);
        });
        console.log(orders)
    };


    console.log(orders)


    const deleteOrder = (id) => {
        console.log(id);
        axios.delete(`/orders/list/${id}`);
        getBasket();
        getBasket();
    };

    useEffect(()=>{
        getBasket()
    }, [])


    return (
        <div className="mainBlockOrders">
            <div className="buttonOrder" onClick={()=>getMaxPrice()}>
                Максимальный чек
            </div>
            {orders.map((obj)=>
            <div className="order">
                <div className="oneOrder">
                            <div className="tileIdOrder">
                                Заказ № {obj._id}
                                {
                                    obj.listProducts.map((obj)=>
                                    <div className="oneProductOrder">
                                        <img src={`http://localhost:4444/upload/${obj.urlImage}`} style={{ width: "64px", height: "64px", borderRadius: "2px", marginTop: "4px", marginLeft: "4px"}}></img>
                                        <div className='infoOrder'>
                                            <div className=''>
                                                <div style={{fontSize: "20px"}}>{obj.title} </div>
                                            </div>
                                            <div className=''>
                                                <div>Количество 1</div>
                                            </div>
                                        </div>
                                    </div>)
                                }
                                <div className="buttonOrder" onClick={()=>deleteOrder(obj._id)}>
                                    Выполнить заказ
                                </div>
                            </div>
                        </div>
                        <div className="buyerInfo" onClick={()=>console.log(obj.buyerId._id)}>
                        <div className="tileIdOrder"> 
                                    Покупатель {obj.buyerId.surName} {obj.buyerId.firstName}
                                </div>
                            <div className="info">
                                <div>
                                    Контакты: {obj.buyerId.phoneNumber}
                                </div>
                                <div>
                                    Адрес: {obj.buyerId.delivery_address}
                                </div>
                            </div>
                        </div>
            </div>
)
            }
        </div>
        )
}