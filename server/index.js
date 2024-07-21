import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validation/Validations.js';
import checkAutharization from './utilities/checkAutharization.js';
import createWordReport from './utilities/createWordReport.js'
import { Document , Packer, Paragraph, TextRun, HeadingLevel} from 'docx';
// const { Document, Packer, Paragraph, TextRun } = require('docx');
// const path = require('path');

//---------------------------------------------------------------------------
import { validationResult } from 'express-validator';
import BuyerModel from './models/Buyer.js';
import CardProductModel from './models/CardProduct.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CardProduct from './models/CardProduct.js';
import BasketModel from './models/Basket.js';
import OrdersModel from './models/Orders.js';
import Basket from './models/Basket.js';
import multer from 'multer';

const app = express();
const storage = multer.diskStorage({
    destination: (_,__, cb)=>{
        cb(null, 'uploads');
    },
    filename: (_,file, cb)=>{
        cb(null, file.originalname);
    },
});



const upload = multer({storage});

app.use(express.json());
app.use('/upload', express.static('uploads'))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Disposition', 'attachment; filename=sample.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    // res.setHeader('wordDocument');
    next();
  });



mongoose.connect('mongodb+srv://usersdata:0hZzN9CAxapArcxI@cluster0.skrlm7h.mongodb.net/examination?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log("DB ok"))
    .catch((err)=>console.log("DB error", err));


app.get('/',(req, res)=>{
    res.json({
        success: "success",
    })
});






app.post('/upload', upload.single('image'), (req, res)=>{
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        });   
    } catch (error) {
        console.log(error) 
    }
});


//авторизация
app.post("/auth/login", async (req, res)=>{
    try {
        if (req.body.phoneNumber == "admin" && req.body.password == "admin") {
            const token = jwt.sign({
                _id: "admin",
            }, 'secret123', {expiresIn: '30d'});
            return res.json({
                "user": "admin",
                "token": token

            });
        }

        const buyer = await BuyerModel.findOne({phoneNumber: req.body.phoneNumber});
        if (!buyer){
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValuePass = await bcrypt.compare(req.body.password, buyer._doc.passwordHash); //возвращает true or false
        if (!isValuePass) {
            return res.status(404).json({
                message: "Неверный логин или пароль",
            });
        }
        const token = jwt.sign({
            _id: buyer._id,
        }, 'secret123', {expiresIn: '30d'});
        res.json({
            ...buyer._doc,
            token
        });

    } catch (error) {
        return res.json({"ошибка": error});
    }
});


app.get('/auth/me', checkAutharization, async (req, res)=>{
    try {
        if (req.userId=="admin") {
            return res.json({
                "user": "admin"}
            )
        }
        const user = await BuyerModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Такого пользователя нет",
            });
        }
        res.json(
            user
    )
    } catch (error) {
    }
});



//регистрация
app.post('/auth/register', async (req, res)=>{
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new BuyerModel({
        surName: req.body.surName ,
        firstName: req.body.firstName ,
        delivery_address: req.body.delivery_address ,
        phoneNumber: req.body.phoneNumber ,
        passwordHash: passwordHash ,
    });
    const buyer = await doc.save();
    return res.json({buyer});
});



//---------------------------Работа с товарами-----------------------------
//Получить все товары
app.get("/products", async (req, res)=>{
    try {
        const allProducts = await CardProduct.find();

        return res.status(200).json(allProducts);
    } catch (error) {
        
    }
});


//Получить один товар
app.post("/products/:id", async (req, res)=>{
    try {
        const productId = req.params.id;

        const allProducts = await CardProduct.findOne({
            _id: productId,
        });

        return res.status(200).json(allProducts);
    } catch (error) {
        
    }
});

//Добавить товар в корзину
app.post("/basket/:idProduct", checkAutharization, async (req, res)=>{
    try {
        console.log('rwerwee')
        const doc = new BasketModel({
            buyer: req.userId,
            productCards: req.params.idProduct,
            count: req.body.count 
        });
        console.log("fdsfdd")
          
        const Basket = await doc.save();
        const buyerId = req.userId;
        const allProductsBasket = await BasketModel.find({
            buyer: buyerId
        }).populate('productCards').populate('buyer').exec()  
        return res.status(200).json(allProductsBasket);
    } catch (error) {
    }
});

//Удалить товар из корзины
app.delete("/basket/:idProduct", checkAutharization, async (req, res)=>{
    try {
        const productId = req.params.idProduct;
        const idBuyer = req.userId
        console.log(idBuyer)
        console.log(productId)
        const doc = await BasketModel.findOneAndDelete(
        {
            productCards: productId,
            buyer: idBuyer
        }, 
        {
            $inc: {viewsCount: 1},
        },
        {
            returnDocument: 'after'
        } 
        );
        return res.json(doc);
    
    } catch (error) {
        console.log(error)
        res.status(500).json({"error":"Не удалось получиgfhfgть статью"});
    }
});



//Получить товары с корзины 
app.get("/basket", checkAutharization, async (req, res)=>{
    try {
        const buyerId = req.userId;
        const allProductsBasket = await BasketModel.find({
            buyer: buyerId
        }).populate('productCards').populate('buyer').exec()

        return res.status(200).json(allProductsBasket);
    } catch (error) {
        return res.status(400).json({"message": error})
    }
});





//--------------------------------------------------------------------------

app.get("/download", async (req, res)=> {
    const order ={
        "_id": "664455043f12f8fbecee1010",
        "buyerId": {
            "_id": "664452a13f12f8fbecee0ff1",
            "surName": "Кавалёнок",
            "firstName": "Дмитрий",
            "delivery_address": "г. Барановичи, ул. Войкова 12",
            "phoneNumber": "375448654512",
            "passwordHash": "$2b$10$A.RUMNxAY0QqL4MGAi/Eb.aMuqz4/QvkHOsfcIU7CY4upcXsxzGB.",
            "__v": 0
        },
        "listProducts": [
            {
                "_id": "664450bf3f12f8fbecee0fd9",
                "title": "Корм Nature's Protection беззерновой для щенков",
                "descriptionProduct": "ПОЛНОЦЕННЫЙ БЕЗЗЕРНОВОЙ КОРМ ДЛЯ РАСТУЩИХ СОБАК МАЛЫХ ПОРОД С БЕЛОЙ ШЕРСТЬЮ (масса тела взрослого 1-10 кг) от 3 до 12 месяцев.\\nМожет помочь снизить риск возникновения бурых пятен от слез под глазами и слюны вокруг бороды и на лапах. Корм разработан с целью поддержания необходимого прозрачного состава слезной",
                "price": 48,
                "quantity_goods": 100,
                "urlImage": "prod1.png",
                "__v": 0
            },
            {
                "_id": "664450fb3f12f8fbecee0fe1",
                "title": "Корм Primordial, для щенков всех пород с курицей",
                "descriptionProduct": "Puppy Chicken & Sea Fish Сухой корм  (холистик) д/щенков всех пород с курицей и морской рыбой",
                "price": 48,
                "quantity_goods": 100,
                "urlImage": "prod3.png",
                "__v": 0
            }
        ],
        "createdAt": "2024-05-15T06:24:04.057Z",
        "updatedAt": "2024-05-15T06:24:04.057Z",
        "__v": 0
    };


    const buyer = order.buyerId;
    const products = order.listProducts;

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: `Заказ №: ${order._id}`,
                    heading: HeadingLevel.HEADING_1
                }),
                new Paragraph({
                    text: `Покупатель: ${buyer.surName} ${buyer.firstName}`,
                    heading: HeadingLevel.HEADING_2
                }),
                new Paragraph({
                    text: `Адрес доставки: ${buyer.delivery_address}`,
                    heading: HeadingLevel.HEADING_2
                }),
                new Paragraph({
                    text: `Телефон: ${buyer.phoneNumber}`,
                    heading: HeadingLevel.HEADING_2
                }),
                new Paragraph({
                    text: `Дата создания заказа: ${new Date(order.createdAt).toLocaleString()}`,
                    heading: HeadingLevel.HEADING_2
                }),
                ...products.map(product => 
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Продукт: ${product.title}`,
                                bold: true,
                            }),
                            new TextRun({
                                text: `\nОписание: ${product.descriptionProduct}`,
                            }),
                            new TextRun({
                                text: `\nЦена: ${product.price} руб.`,
                            }),
                            new TextRun({
                                text: `\nКоличество: ${product.quantity_goods}`,
                            }),
                        ],
                        spacing: {
                            after: 200,
                        }
                    })
                )
            ],
        }],
    });


    // Пакуем документ в бинарный формат
    const buffer = await Packer.toBuffer(doc);

    // // Указываем заголовки для скачивания файла
    // res.setHeader(`Content-Disposition', 'attachment; filename=sample.docx`);
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    console.log(buffer)
    res.send(buffer);
    return res.status(200).json({"message": "succes"})
})

//--------------------------------------------------------------------------



//Оформить корзину (отправить список товаров продавцу)
app.get("/orders", checkAutharization, async (req, res)=>{
    try {
        const buyerId = req.userId;
        const listProduct = []
        const allProductsBasket = await BasketModel.find({
            buyer: buyerId
        })
        for (let i = 0; i < allProductsBasket.length; i++) {
            listProduct.push(allProductsBasket[i].productCards)
        }
        const doc = new OrdersModel({
            buyerId: buyerId,
            listProducts: listProduct
        })
        const Orders = await doc.save();
        await BasketModel.deleteMany();
        return res.status(200).json(Orders);
    } catch (error) {
        console.log(error)
        return res.status(400).json({"message": error})
    }
});



//--------------------------Администраторская панель----------------------------
//авторизация админа
app.post('/admin', async (req, res)=>{
    try {

    } catch (error) {
    }
});

//Добавить товар
app.post('/products', async (req, res)=>{
    try {
        const doc = new CardProductModel({
            title: req.body.title,
            descriptionProduct: req.body.descriptionProduct,
            price: req.body.price,
            quantity_goods: req.body.quantity_goods,
            urlImage: req.body.urlImage
        });
    
        const cardProduct = await doc.save();

        return res.status(200).json(cardProduct);
    } catch (error) {
        return res.status(500).send("Ошибка добавления каротчки", error);
    }
});

//Удалить товар
app.delete('/products/:id', async (req,res)=>{
    try {
        const productId = req.params.id;

        const doc = await CardProductModel.findOneAndDelete(
        {
            _id: productId,
        },
        )
    
    return res.json({
        message: "Продукт удалён",
    })
    } catch (error) {
        
    }
});

//Изменить товар
app.patch('/products/:id', async (req, res)=>{
    try {
        const productId = req.params.id;

        const doc = await CardProductModel.updateOne(
        {
            _id: productId,
        },
        {
            title: req.body.title,
            descriptionProduct: req.body.descriptionProduct,
            price: req.body.price,
            quantity_goods: req.body.quantity_goods,
            urlImage: req.body.urlImage
        }
        );

        return res.json({
            message: "ЗАпись обновлена",
        })
    } catch (error) {
    }
    
});

//Получить список заказов
app.get("/orders/list", async (req, res)=>{
    try {
        const allOrders = await OrdersModel.find().populate("buyerId")

        for (let i = 0; i < allOrders.length; i++) {
            
            const element = allOrders[i].listProducts;
            
            allOrders[i].listProducts = i;

            // console.log(allOrders[i]);

            const listDataProducts = []
            for (let j = 0; j < element.length; j++) {

                const elementOne = element[j];
                // console.log(elementOne)
                
                const allProducts = await CardProduct.findOne({
                    _id: elementOne,
                });

                listDataProducts.push(allProducts);
            }
            allOrders[i].listProducts = listDataProducts;
            // console.log(element)
        }
        

        return res.status(200).json({allOrders
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({"message": error})
    }
})


// Вывести заказ с максимальным чеком
//Получить список заказов
app.get("/orders/maxPriceCheck", async (req, res)=>{
    try {
        const allOrders = await OrdersModel.find().populate("buyerId")
        for (let i = 0; i < allOrders.length; i++) {
            const element = allOrders[i].listProducts;
            allOrders[i].listProducts = i;
            const listDataProducts = []
            for (let j = 0; j < element.length; j++) {
                const elementOne = element[j];
                const allProducts = await CardProduct.findOne({
                    _id: elementOne,
                });
                listDataProducts.push(allProducts);
            }
            allOrders[i].listProducts = listDataProducts;
        }
        const dataPrice = {}
        for (let i = 0; i < allOrders.length; i++) {
            let sumCheck = 0;
            for (let j = 0; j < allOrders[i].listProducts.length; j++) { 
                sumCheck = sumCheck + allOrders[i].listProducts[j].price;
            }  
            dataPrice[`${allOrders[i]._id}`] = sumCheck;
        }
        let maxEl = 0;
        let indexMaxEl = 0;
        let index=0
        for (const key in dataPrice) {
            if (dataPrice[key] > maxEl){
                maxEl = dataPrice[key];
                indexMaxEl = index;
            }
            index=index+1;
        }
        const dataRes = allOrders[indexMaxEl]
        return res.status(200).json({"allOrders": [dataRes]
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({"message": error})
    }
})




//Выполнить заказ (Удалить заказ)
app.delete("/orders/list/:idOrder", createWordReport, async (req, res) => {
    try {
        const orderId = req.params.idOrder;
        const documentWord = req.wordDocument;


        const doc = await OrdersModel.findOneAndDelete({ _id: orderId });

        if (!doc) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Указываем заголовки для скачивания файла
        res.setHeader('Content-Disposition', 'attachment; filename=sample.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        console.log(documentWord)
        res.send(documentWord);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});




app.listen(4444, (err)=>{
    if(err){
        return console.log("Сервер не запустился");
    }
    console.log("Сервер запустился");
})