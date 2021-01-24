const express = require('express');
const router = express.Router();
const {Book} = require('../models');

const stor = {
    books: [],
};

const {books} = stor;


[1, 2, 3].map(el => {
    const newBook = new Book(`книга ${el}`, `описание книги ${el}`);
    stor.books.push(newBook);
});

router.get('/', (request, responce) => {
    responce.render("books/index", {
        title: "Книги",
        books: books
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги",
        book: {},
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {
            title: "Просмотр книги",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {
            title: "Обновление книги",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});



// API

router.post('/create', (req, res) => {
    const {title, desc} = req.body;
    const newBook = new Book(title, desc);
    books.push(newBook);
    res.redirect('/books')
});

router.post('/update/:id', (req, res) => {
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            desc,
        };
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;