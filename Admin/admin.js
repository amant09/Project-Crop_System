const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "CropSystem API",
            version: "1.0.0",
            description: "An API to help farmer sell their produce."
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ] 
    },
    apis: ['./routes/*.js']
};
const specs = swaggerJsDoc(options);
//load express
const app = express();
app.use("/api-docs", swaggerUI.serve , swaggerUI.setup(specs));
//load mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//configure body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//api calls
const router = require('./routes/api')
app.use(router);


//error handling
app.use((err,req,res,next)=>{
    //console.log(err);
    res.sendStatus(404);
    //res.send({error: err.messege});

});

const port = process.env.PORT || 4000;
app.listen(port);

module.exports = app ;