import express from 'express';
const router = express.Router();

import Vote from '../models';

router.get('/votes', (req, res) => {
	Vote.find({}, (err, docs) => {
		if(err){
			return res.sendStatus(500).json(err);
		}
		res.json(docs)
	})
});

router.post('/vote/:id', (req,res) => {
	let id = req.params.id;

	let onSave = function (vote){
		return err => {
			if(err) {
				return res.sendStatus(500).json(err)
			}
			res.json(vote)
		}
	}

	Vote.findOne({showId : id }, (err, doc) =>{
		if(doc) {
			//actualizo este doc
			doc.count = doc.count + 1
			doc.save(onSave(doc))
		}else{
			// creo doc nuevo con count 1
			let vote = new Vote();
			vote.showId = id;
			vote.count = 1
			vote.save(onSave(vote))
		}
	})



});

export default router;
