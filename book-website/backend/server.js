const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

//connecting to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});
const connection = mongoose.connection;

//requiring login routes
const userRoutes = require('./routes/login');
app.use('/user', userRoutes);

//requiring book routes
const bookRoutes = require('./routes/book');
app.use('/book', bookRoutes);

//requiring accessories
const reviewRoutes = require('./routes/review');
app.use('/review',reviewRoutes);


//
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
});





app.listen(port, ()=>{
    console.log(`Serve is running on port: ${port}`);
})