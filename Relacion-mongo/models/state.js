import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let StateSchema = new Schema({
	nombre : String,
});

export default mongoose.model('State', StateSchema)
