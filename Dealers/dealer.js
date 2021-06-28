
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
//swagger definition
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
                url: "http://localhost:5000"
            }
        ] 
    },
    apis: ['./routes/*.js']
};
//initialise swaggerdocumentation
const specs = swaggerJsDoc(options);
//load express
const app = express();
//load swagger UI
app.use("/api-docs", swaggerUI.serve , swaggerUI.setup(specs));


//load mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;





//configure body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = require('./routes/api')
app.use(router);



const port = process.env.PORT || 5000;
app.listen(port);


module.exports = app;