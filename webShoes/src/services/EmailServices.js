const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = ''
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>Bạn đã đặt sản phẩm bên <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} đ</b></div>
        <div>Shop giày FP xin chân thành cảm ơn bạn đã ủng hộ Shop</div>
        <div>Chúc bạn 1 ngày tốt lành 👻</div>
        </div>`
        attachImage.push({path:order.image})

    })



    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: process.env.MAIL_ACCOUNT, // list of receivers
        subject: "Bạn đã đặt hàng tại Shop Giày FP", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công</b></div>${listItem}`, // html body
        attachments:attachImage,
    });
}


module.exports = {
    sendEmailCreateOrder
}