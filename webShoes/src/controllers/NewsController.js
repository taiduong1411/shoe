const NewsServices = require("../services/NewsServices")

const getAllNews = async (req, res) => {
    try {
        const response = await NewsServices.getAllNews()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}

const createOne = async (req, res) => {
    try {
        const response = await NewsServices.createOne(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({
            message: e
        })
    }
}

module.exports = {
    getAllNews,
    createOne
}
