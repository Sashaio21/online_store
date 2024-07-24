import './CardForBasket.css'
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { fetchBasket } from '../redux/slices/basket';
import { Bolt } from '@mui/icons-material';

export function CardForBasket ({obj, itemsBasket, setItmesBasket}){
    
    const basketDis = useDispatch();
    const getBasket = async () =>{
        const dataBasket1 = await basketDis(fetchBasket());
        setItmesBasket(dataBasket1.payload);
    };

    console.log("dsfdsf", Boolean(obj.productCards))

    const deleteBasket = (idProduct)=>{
        axios.delete(`/basket/${idProduct}`)
        getBasket()
        console.log("удалил");
    }

    return (
        <>
        {Boolean(Boolean(obj.productCards))?(
            <div className="mainBlockCardBasket">
            <img src={`http://localhost:4444/upload/${obj.productCards.urlImage}`} style={{ width: "100px", height: "100px", borderRadius: "2px", marginTop: "4px", marginLeft: "4px"}}></img>
            <div className='info'>
                <div className='blockForDeleteAndCount2'>
                    <div style={{fontSize: "15px"}}>{obj.productCards.title}</div>
                    <div style={{fontSize: "18px", alignSelf: "flex-end"}}>{obj.productCards.price} BYN</div>
                </div>
                <div className='blockForDeleteAndCount'>
                    <div>1</div>
                    <img src='../delete.png' className='iamgeDelete' onClick={()=>deleteBasket(obj.productCards._id)}></img>
                </div>
            </div>
        </div>
        ):(
            <div className="mainBlockCardBasket">
        </div>
        )
        }
        </>
       
    )
}




{/* <div className='info'>
    <div className='titleCardBasket'>Корм </div>
    <div className='blockForDeleteAndCount'>
        <div className='count'>количество</div>
        <img src='delete.png' style={{width: "25px", height: "25px"}} className='buttonDelete'></img>
    </div>
</div> */}