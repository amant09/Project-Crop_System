const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const {requireAuth} = require('./AuthJwt/UserAuth')
const cookieParser = require('cookie-parser');

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
                url: "http://localhost:3000"
            }
        ] 
    },
    apis: ['./routes/*.js']
};
const specs = swaggerJsDoc(options);
const app = express();
app.use("/api-docs", swaggerUI.serve , swaggerUI.setup(specs));


//load mongoose

mongoose.Promise = global.Promise;




app.use(cookieParser());
//configure body parser
app.use(bodyParser.json());
//apis
const authController = require('./controllers/farmer_control');
app.get('/farmerprofile/viewcrop',requireAuth, authController.viewCrop);
app.use(router);

//error handling
app.use((err,req,res,next)=>{
    //console.log(err);
    res.sendStatus(404);
    //res.send({error: err.messege});

});



const PORT = process.env.PORT || 3000;
app.listen(PORT);

module.exports = app;