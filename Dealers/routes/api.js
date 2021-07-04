const express = require('express');
const {Dealer, Crop} = require('../models/db');
const router = express.Router();
const authController = require('../controllers/dealerControl');


/**
 * @swagger
 * components:
 *  schemas:
 *      DealerSchema: 
 *          type: object
 *          required:
 *              - name
 *              - username
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              name:
 *                  type : string
 *              username:
 *                  type : string
 *              email: 
 *                  type : string
 *              password: 
 *                  type : string
 *          example:
 *              id: 60cf230f9d0a832b54414c9a
 *              name: Suresh Tiwari
 *              username: suresht007
 *              email: abc@gmail.com
 *              password: 12345678
 *              
 * 
 */
/**
 * @swagger
 * tags:
 *  name : Dealers
 *  description : Dealers data managing api
 */

/**
 * @swagger
 * /dealers:
 *      get:
 *          summary: Dispalys the list of all Dealers
 *          tags: [Dealers]
 *          responses:
 *              200:
 *                  description: Dealers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/DealerSchema'
 *                    
 *                       
 */

/**
 * @swagger
 * /dealer/{id}:
 *      get:
 *          summary: Get Dealer by id
 *          tags : [Dealers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Dealer id        
 *          responses:
 *              200:
 *                  description: Dealers description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/DealerSchema'
 *              404:
 *                  description: Dealer not found                       
 */


router.get('/dealer/:id', (req , res)=>{
    Dealer.findById(req.params.id).then((dealer)=>{
        if(dealer){
            res.json(dealer)
        }else{
            res.send("Invalid ID!");
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});
router.get('/dealerprofile/searchcrop/:name', authController.searchCrop);


/**
 * @swagger
 * /dealer:
 *      post:
 *          summary: create a new dealer
 *          tags: [Dealers]
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/DealerSchema'
 *              
 *          responses:
 *              200:
 *                  description: Dealers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/FarmerSchema'
 *                    
 *                       
 */

router.post('/dealer', (req, res )=>{
    var dealer = new Dealer(req.body);
    dealer.save().then((dealer)=>{
        res.send(dealer);

    }).catch((err)=>{
        if(err){
            throw err;
        };
    });
   
});

router.get('/dealers' , (req, res)=>{
    Dealer.find().then((dealers)=>{
        res.json(dealers)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});

/**
 * @swagger
 * /dealer/{id}:
 *  delete:
 *      summary: Delete Dealer details
 *      tags: [Dealers]
 *      parameters:
 *        - in : path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: true
 *      responses:
 *          200:
 *              description: The dealer details have been deleted
 *          404:
 *              description: id not found
 */
router.delete('/dealer/:id' , (req, res,next) =>{
    const id = req.params.id;
    Dealer.findByIdAndRemove({_id: id}).then((dealer)=>{
        res.json(dealer)
    }).catch(next);
});


/**
 * @swagger
 * /dealer/{id}:
 *  put:
 *      summary: Update Dealer details
 *      tags: [Dealers]
 *      parameters:
 *        - in : path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: true
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DealerSchema'
 *      responses:
 *          200:
 *              description: The dealer details have been updated
 *          404:
 *              description: id not found
 *          500:
 *              some error occured
 */
router.put('/dealer/:id', (req,res,next)=>{
    Dealer.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Dealer.findOne({_id: req.params.id}).then((dealer)=>{
            res.json(dealer);
    }).catch(next);
});
});

router.post('/buycrop',authController.buyCrop);








module.exports = router;













/*const mongoose =require("mongoose");
mongoose.model("Entry",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});













///////////////////////
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
require("./Book");
const dataBase = mongoose.model("Entry");

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/test", () => {
    console.log("database connected");
});

app.get('/', (req, res) => {
    res.send("default page with get");
})

app.get('/inventory', (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        throw err;
    })
})

app.delete('/inventory', (req, res) => {
    dataBase.remove().then(() => {
        console.log("removed all");
        res.send("deleted all");
    }).catch(err => {
        throw err;
    })
})

app.delete('/inventory/:id', (req, res) => {
    dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch(err => {
        if (err) {
            throw err;
        }
    })
    res.send("deleted");
})

app.get('/inventory/:id', (req, res) => {
    dataBase.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data)
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})


app.post('/inventory', (req, res) => {
    var newData = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    var data = new dataBase(newData)
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        throw err;
    })
    console.log(req.body);
    res.send("data sent")
})

app.put("/inventory/:name", (req, res) => {
    var itemName = req.params.name;
    dataBase.findByIdAndUpdate(itemName,req.body).then((items)=>{
        res.send(items);
    }).catch((err)=>{
        console.log(err);
    })
});

app.listen(4545, () => {
    console.log("up and running");
})*/