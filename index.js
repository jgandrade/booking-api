require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Failed to connect to Database."));
db.once("open", () => console.log("Connected to Database"));

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Server is running at port " + port));