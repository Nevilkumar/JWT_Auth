const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb://localhost:27017/Authentication', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection Successfull'))
  .catch((err) => console.log('Error in DB connection :' + err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.get('/profile', requireAuth, (req, res) => res.render('profile'));



app.use(authRoutes);

//Server Declaration
app.listen(3000, () => {
  console.log('Express server started at port: 3000');
});