const express = require('express');
const app = express();
const router = require('./apis')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

const  mongoAtlasUri = "mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ApiGateway?retryWrites=true&w=majority";


try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));

    }catch (error) { 
    console.log("could not connect");    
    }

mongoose.Promise = global.Promise;


app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(4545, ()=>{
    console.log("Server up and running");
});