import express from 'express';
const router = express.Router();

import AuthorCtrl from '../controllers/author.js';
import BookCtrl from '../controllers/book.js';
import CountryCtrl from '../controllers/country.js';
import StateCtrl from '../controllers/state.js';
import UserCtrl from '../controllers/user.js';

router.post('/author', AuthorCtrl.addAuthor);
router.get('/authors', AuthorCtrl.getAuthors);

router.post('/book', BookCtrl.addBook);
router.get('/books', BookCtrl.getBooks);

router.post('/country', CountryCtrl.addCountry);
router.get('/countrys', CountryCtrl.getCountry);

router.post('/state', StateCtrl.addState);
router.get('/states', StateCtrl.getState);

router.post('/user', UserCtrl.addUser);
router.get('/users', UserCtrl.getUser);

export default router;
