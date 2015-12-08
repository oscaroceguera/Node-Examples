import mongoose from 'mongoose';
let Schema = mongoose.Schema;
import Country from './country';
import State from './state';
let UserSchema = new Schema({
	nombre : String,
	direccion : String,
	country : { type : Schema.ObjectId, ref : 'Country' },
	state : { type : Schema.ObjectId , ref : 'State' }
});

export default mongoose.model('User', UserSchema)
