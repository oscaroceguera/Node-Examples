import mongoose from 'mongoose';
import User from '../models/user';
import Country from '../models/country';
import State from '../models/state';

export default {
	addUser : (req, res) => {

		let user = new User();

		user.nombre = req.body.nombre;
		user.direccion = req.body.direccion;
		user.country = req.body.country;
		user.state = req.body.state;

		user.save((err, data) => {
			if(err) return res.status(500).json(err);
			res.status(200).jsonp(data)
		})
	},

	getUser : (req, res) => {
		User.find({})
			.populate('country')
			.populate('state')
			.exec((err, docs) =>{
				if(err) return res.status(500).json(res.message)
				res.status(200).json(docs)
			})
	}
}
