import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    tittle: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number
});

module.exports = mongoose.model("Courses", courseSchema);
