const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt } = newOrder
        try {
            const Promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    const createdOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                        isPaid,
                        paidAt
                    })

                    if (createdOrder) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS'
                        }
                    }

                } else {
                    return {
                        status: 'ERR',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(Promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `san pham voi id${newData.join(',')} khong du hang`
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS'
            })
        } catch (e) {
            reject(e)
        }
    })
}



const getAllOrderDetails = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'the order is not definded'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getOrderDetails = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'the order is not definded'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}


const cancelOrderDetails = (id, data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const Promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount }

                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    { new: true }
                )
                console.log('productData', productData)
                if (productData) {
                    order = await Order.findOneAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'the order is not definded'
                        })
                    }
                } else {
                    return {
                        status: 'ERR',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(Promises)
            console.log('results', results)
            const newData = results && results.filter((item) => item)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `san pham voi id${newData.join(',')} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })

        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails
}