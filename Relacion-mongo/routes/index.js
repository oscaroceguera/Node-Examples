import express from 'express';
const router = express.Router();

import AuthorCtrl from '../controllers/author.js';
import BookCtrl from '../controllers/book.js';

import Author from '../models/author';

router.post('/author', AuthorCtrl.addAuthor);
router.get('/authors', AuthorCtrl.getAuthors);
router.post('/book', BookCtrl.addBook);
router.get('/books', BookCtrl.getBooks);



export default router;
