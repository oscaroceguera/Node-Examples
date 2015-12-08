import mongoose from 'mongoose';
import Country from '../models/country';

export default {
	addCountry : (req, res) => {
		let country = new Country();
		country.nombre = req.body.nombre;
		country.save((err, data)=>{
			if(err) return res.status(500).json(err);
			res.status(200).jsonp(data)
		})
	},

	getCountry : (req, res) => {
		Country.find({}, (err, docs) => {
			if(err) return res.status(500).send(err.message);
			res.status(200).json(docs)
		})
	}
}
