const express = require('express');
const connectDB = require('./config/db');

const app = express();
//add this bc i receive network error from front end
var cors = require('cors');
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
// Allows parsing of req body
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/portfolio', require('./routes/api/portfolio'));
app.use('/api/blog', require('./routes/api/blog'));
app.use('/api/page', require('./routes/api/page'));
app.use('/api/item', require('./routes/api/item'));
app.use('/api/comment', require('./routes/api/comment'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
