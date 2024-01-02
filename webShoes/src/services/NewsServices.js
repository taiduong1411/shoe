const News = require('../models/News')

const getAllNews = async () => {
    return News.find()
}

const createOne = async (news) => {
    const createdNews = await News.create(news)

    return createdNews
}

module.exports = {
    getAllNews,
    createOne
}