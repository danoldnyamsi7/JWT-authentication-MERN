const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");


//dotev config
dotenv.config();

//conncetion to DB
mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log('Connected to DB!');
})
const PORT = process.env.APP_PORT;

//importing routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//using middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api', postRoute);

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})