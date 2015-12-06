import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
	nombre : String,
	biografia : String,
	fecha_de_nacimiento : Date,
	nacionalidad : String
});

export default mongoose.model('Author', AuthorSchema)
