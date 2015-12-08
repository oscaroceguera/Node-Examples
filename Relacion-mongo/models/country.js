import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let CountrySchema = new Schema({
	nombre : String,
});

export default mongoose.model('Country', CountrySchema)
