const { MongoClient } = require('mongodb');
import mongoose from 'mongoose';

async function decreaseQuantity() {
    try {
        await client.connect();
        mongoose.connect('mongodb+srv://usersdata:0hZzN9CAxapArcxI@cluster0.skrlm7h.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
                .then(()=>console.log("DB ok"))
                .catch((err)=>console.log("DB error", err));
        // Создание Change Stream
        const changeStream = collection.watch();

        // Слушаем изменения
        changeStream.on('change', async (change) => {
            if (change.operationType === 'update' && change.updateDescription.updatedFields && change.updateDescription.updatedFields.quantity_goods) {
                const updatedDocument = await collection.findOne({ _id: change.documentKey._id });
                if (updatedDocument.quantity_goods === 0) {
                    console.log(`Quantity_goods for document ${updatedDocument._id} is 0. No further action is needed.`);
                } else {
                    await collection.updateOne({ _id: updatedDocument._id }, { $inc: { quantity_goods: -1 } });
                    console.log(`Quantity_goods for document ${updatedDocument._id} decreased by 1`);
                }
            }
        });
    } finally {
    }
}

decreaseQuantity().catch(console.error);
