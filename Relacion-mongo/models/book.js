import mongoose from 'mongoose';
import Author from './author';

let Schema = mongoose.Schema;

let BookSchema = new Schema({
	titulo : String,
    paginas : Number,
    autor : { type : Schema.ObjectId, ref : "Autor" }
});

export default mongoose.model('Book', BookSchema)
