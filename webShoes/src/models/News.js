const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const News = mongoose.model("News", newsSchema);
module.exports = News;