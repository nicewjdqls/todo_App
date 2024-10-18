const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require("./routes/index");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api",indexRouter)
const mongoURI = 'mongodb://localhost:27017/todo-demo';


mongoose.connect(mongoURI, {useNewUrlParser:true}).then(()=> {
  console.log("mongoose connected");
}).catch((err)=>{
  console.log("DB connection fail", err);
});

app.listen(5000, ()=>{
  console.log("server on 5000")
});
