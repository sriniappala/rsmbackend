const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());


mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

/*
mongoose.connect("mongodb+srv://sxappala:sxappala@srini-mongogcp.uv7qu.gcp.mongodb.net/customers?retryWrites=true&w=majority",
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
)
*/

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Mongo DB Connection Suucessful....');
});

const requirementRouter = require('./routes/requirement');
app.use('/requirement', requirementRouter);


app.listen(port, () => {
    console.log('App server is running.' + port);
})

