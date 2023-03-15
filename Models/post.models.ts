import mongoose, { model } from "mongoose";
import mongoosePag from "mongoose-paginate";

const postSchema = new mongoose.Schema({
    tittle: String,
    miniaturePost: String,
    content: String,
    path: {
        type: String,
        unique: true
    },
    create_at: Date
});
postSchema.plugin(mongoosePag);

module.exports = mongoose.model("Post", postSchema);