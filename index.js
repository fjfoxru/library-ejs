const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
// const fileMiddleware = require('./middleware/file');

const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(loggerMiddleware);

app.use('/files', express.static(__dirname+'/public'));

app.use('/', indexRouter);
app.use('/api/books', booksApiRouter);
app.use('/books', booksRouter);
app.use('/user', userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});