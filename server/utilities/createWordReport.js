import { Document, Packer, Paragraph, TextRun } from 'docx';
export default async (req, res, next) => {
    try {
        const buyer = req.order.buyerId;
        const products = req.order.listProducts;

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
        const buffer = await Packer.toBuffer(doc);
        req.wordDocument = buffer;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating the document" });
    }
};
