import mongoose from "mongoose";
import mongoosePag from "mongoose-paginate"; 

const courseSchema = new mongoose.Schema({
    tittle: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number
});
//se hace la paginacion de estos campos
//esto porq son demasiados cursos y por ende podemos paginarlos en segmentos [1][2][3][4]
courseSchema.plugin(mongoosePag);

module.exports = mongoose.model("Courses", courseSchema);
