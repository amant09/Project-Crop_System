const express = require('express');
const app = express();
const {requireAuth} = require('./AuthJwt/UserAuth')
const router = require('./apis')
const mongoose = require('mongoose');

const  mongoAtlasUri = "mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ApiGateway?retryWrites=true&w=majority";


try {
    mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, () =>
    console.log("connected"));

    }catch (error) { 
    console.log("could not connect");    
    }

mongoose.Promise = global.Promise;



app.use(router);

app.listen(4545, ()=>{
    console.log("Server up and running");
});