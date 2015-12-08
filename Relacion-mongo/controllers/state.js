import mongoose from 'mongoose';
import State from '../models/state';

export default {
	addState : (req, res) => {
		let state = new State();
		state.nombre = req.body.nombre;
		
		state.save((err, data) => {
			if(err) return res.status(500).json(err.message);
			res.status(200).json(data)
		})
	},

	getState : (req, res) => {
		State.find({})
			.exec((err, docs) => {
				if(err) return res.status(500).json(err.message);
				res.status(200).json(docs)
			})
	}
}
