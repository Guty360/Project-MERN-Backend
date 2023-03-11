import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    tipo: String,
    path: String,
    order: Number,
    active: Boolean,
});

module.exports = mongoose.model("Menu", menuSchema)