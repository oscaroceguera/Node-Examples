import mongoose from 'mongoose';
import Author from '../models/author';

export default {

	addAuthor : (req, res) => {
		let author = new Author();

		author.nombre = req.body.nombre;
		author.biografia = req.body.biografia;
		author.fecha_de_nacimiento = req.body.fecha_de_nacimiento;
		author.nacionalidad = req.body.nacionalidad;

		author.save((err, data) =>{
			if(err) res.status(500).send(err.message);

			res.status(200).jsonp(data)
		})
	},

	getAuthors : (req, res) =>{
		Author.find({}, (err, docs) =>{
			if(err){
				return res.status(500).send(err.message);
			}
			res.json(docs)
		})
	}

}
