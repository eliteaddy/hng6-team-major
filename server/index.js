const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./routes/auth');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', auth);

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome To PropertyPro',
}));

app.use((req, res, next) => {
  const error = new Error('The specified route does not exist');
  error.status = 404;
  next(error);
});
  
app.use((error, req, res, next) => {
  res.status(error.status || 400);
    res.json({
      status: 'error',
      error: error.message,
    });
    next();
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});