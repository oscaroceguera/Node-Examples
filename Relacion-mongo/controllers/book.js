import mongoose from 'mongoose';
import Author from '../models/author';
import Book from '../models/book';

export default {

	addBook : (req, res) => {
		let book = new Book();

		book.titulo = req.body.titulo;
		book.paginas = req.body.paginas;
		book.autor = req.body.autor;

		book.save((err, data) =>{
			if(err) res.status(500).json(err);

			res.status(200).jsonp(data)
		})
	},

	getBooks : (req, res) =>{
		Book.find({}, (err, docs) =>{

			if(err){
				return res.status(500).send(err.message);
			}

			Author.populate(docs, {path: "autor"},(err, docs) =>{
            	res.status(200).json(docs);
        	});

		})
	}

}
