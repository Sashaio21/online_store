import { Header } from "../components/Header"
import './AddProduct.css'
import axios from '../axios';
import { useEffect, useRef, useState } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


export function  AddProduct(props) {
    const inputFileRef = useRef(null);
    const [urlImage, setUrlImage] = useState(false)
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [changeProd, setChangeProd] = useState(null)

    const AddProduct = (title, description, price, urlImage) => {
        const productsData = {
            title: title,
            descriptionProduct: description,
            price: price,
            quantity_goods: 100,
            urlImage: urlImage
        }
        axios.post("/products", productsData)
    }

    const changeProduct = (title, description, price, urlImage, id) => {
        const productsData = {
            title: title,
            descriptionProduct: description,
            price: price,
            quantity_goods: 100,
            urlImage: urlImage
        }
        console.log(productsData)
        axios.patch(`/products/${id}`, productsData)
        return <Navigate to={"/admin"}></Navigate>
    }

    useEffect(()=> {
        if(Boolean(id)){
            console.log("есть")
             axios.post(`/products/${id}`).then(({data})=>{
                console.log(data);
                setChangeProd(data)
              });
            console.log(changeProd)
        }
    },[])


    console.log("props ",id)
    const handleChangeFile = async (event) => {
        try {
          const formData = new FormData()
          formData.append('image', event.target.files[0])
          const {data} = await axios.post('/upload', formData);
          console.log((data.url.replaceAll("/uploads/", "")))
          setUrlImage(data.url.replaceAll("/uploads/", ""))
        } catch (error) {
        }
        console.log(event.target.files)
      };
      console.log(urlImage)
    
    
    
    return (
        <div className="App">
            {Boolean(changeProd) ? (
                <div className="mainBlockForAddProduct">
                {!urlImage ? (
                        <div>
                            <div className="ButtonAddPhoto" onClick={()=>inputFileRef.current.click()}>Добавить изображение</div>
                            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                            {/* <div>
                                <img src={`http://localhost:4444/upload/${urlImage}`} className="imgStyle"></img>
                        </div> */}
                        </div>
                    ) : (
                        <div>
                            <img src={`http://localhost:4444/upload/${urlImage}`} className="imgStyle"></img>
                        </div>
                    )
                    }
                    <div className="inputsAddProduct">
                        <input placeholder="Название товара" className="titleProduct" onChange={(event)=>setTitle(event.target.value)} defaultValue={changeProd.title}></input>
                        <textarea placeholder="Описание товара" className="descriptionProduct" onChange={(event)=>setDescription(event.target.value)} defaultValue={changeProd.descriptionProduct}></textarea>
                        <input placeholder="Цена" className="price" type="number" step="0.01" onChange={(event)=>setPrice(event.target.value)} defaultValue={changeProd.price}></input>
                    </div>
                    <div className="manipulationWithProduct">
                        <div className="buttonAdd" onClick={()=>changeProduct(title, description, price, urlImage, changeProd._id)}>Изменить</div>
                        <div className="buttonCancel">Отмена</div>
                    </div>
                </div>
            ):(
                <div className="mainBlockForAddProduct">
            {!urlImage ? (
                    <div>
                        <div className="ButtonAddPhoto" onClick={()=>inputFileRef.current.click()}>Добавить изображение</div>
                        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                        {/* <div>
                            <img src={`http://localhost:4444/upload/${urlImage}`} className="imgStyle"></img>
                    </div> */}
                    </div>
                ) : (
                    <div>
                        <img src={`http://localhost:4444/upload/${urlImage}`} className="imgStyle"></img>
                    </div>
                )
                }
                <div className="inputsAddProduct">
                    <input placeholder="Название товара" className="titleProduct" onChange={(event)=>setTitle(event.target.value)}></input>
                    <textarea placeholder="Описание товара" className="descriptionProduct" onChange={(event)=>setDescription(event.target.value)}></textarea>
                    <input placeholder="Цена" className="price" type="number" step="0.01" onChange={(event)=>setPrice(event.target.value)}></input>
                </div>
                <div className="manipulationWithProduct">
                    <div className="buttonAdd" onClick={()=>AddProduct(title, description, price, urlImage)}>Добавить</div>
                    <div className="buttonCancel">Отмена</div>
                </div>
            </div>
            )
            }
        </div>
    )
}