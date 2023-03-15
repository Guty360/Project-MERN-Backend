import mongoose from "mongoose";
import paginate from "mongoose-paginate"

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    }
})

newsletterSchema.plugin(paginate)
module.exports = mongoose.model("newsletter", newsletterSchema)