const express = require('express');
const {Farmer , CropDetail} = require('../models/db');
const router = express.Router();
const authController = require('../controllers/farmer_control');
const User = require('../models/user');



router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);



//////////////////////////////////////////////////////////////
//SWAGGER


/**
 * @swagger
 * components:
 *  schemas:
 *      FarmerSchema: 
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
 *  name : Farmers
 *  description : Farmers data managing api
 */

/**
 * @swagger
 * /farmers:
 *      get:
 *          summary: Dispalys the list of all farmers
 *          tags: [Farmers]
 *          responses:
 *              200:
 *                  description: Farmers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/FarmerSchema'
 *                    
 *                       
 */

/**
 * @swagger
 * /farmer/{id}:
 *      get:
 *          summary: Get farmer by id
 *          tags : [Farmers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Farmer id        
 *          responses:
 *              200:
 *                  description: Farmers description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/FarmerSchema'
 *              404:
 *                  description: Farmer not found                       
 */


/**
 * @swagger
 * /farmer:
 *      post:
 *          summary: create a new farmer
 *          tags: [Farmers]
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/FarmerSchema'
 *              
 *          responses:
 *              200:
 *                  description: Farmers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/FarmerSchema'
 *                    
 *                       
 */
/**
 * @swagger
 * /farmer/{id}:
 *  put:
 *      summary: Update Farmer details
 *      tags: [Farmers]
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
 *                      $ref: '#/components/schemas/FarmerSchema'
 *      responses:
 *          200:
 *              description: The farmer details have been updated
 *          404:
 *              description: id not found
 *          500:
 *              some error occured
 */
/**
 * @swagger
 * /farmer/{id}:
 *  delete:
 *      summary: Delete Farmer details
 *      tags: [Farmers]
 *      parameters:
 *        - in : path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: true
 *      responses:
 *          200:
 *              description: The farmer details have been deleted
 *          404:
 *              description: id not found
 */
//////////////////////////
//Crops
/**
 * @swagger
 * components:
 *  schemas:
 *      CropSchema: 
 *          type: object
 *          required:
 *              - cropType
 *              - cropName
 *              - quantity
 *              - price
 *          properties:
 *              id:
 *                  type: string
 *                  description: Auto generated id
 *              cropType:
 *                  type : string
 *              cropName:
 *                  type : string
 *              quantity: 
 *                  type : integer
 *              price: 
 *                  type : integer
 *          example:
 *              _id: 60d033d1034f8253a0e6342d
 *              cropType: Vegetable
 *              cropName: Peas
 *              quantity: 10
 *              price: 20
 *             
 * 
 */
/**
 * @swagger
 * tags:
 *  name : Crops
 *  description : Crops inventory managing api
 */

/**
 * @swagger
 * /farmerprofile/viewcrop:
 *      get:
 *          summary: Dispalys all crops af a particular farmer
 *          tags: [Crops]
 *          responses:
 *              200:
 *                  description: Crops list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/CropSchema'
 *                    
 *                       
 */


/**
 * @swagger
 * /farmerprofile/addcrop:
 *      post:
 *          summary: Add a crop
 *          tags: [Crops]
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/FarmerSchema'
 *              
 *          responses:
 *              200:
 *                  description: Crops list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/CropSchema'
 *                    
 *                       
 */

/**
 * @swagger
 * /farmerprofile/viewcrop/{id}:
 *  delete:
 *      summary: Delete Crop details
 *      tags: [Crops]
 *      parameters:
 *        - in : path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: true
 *      responses:
 *          200:
 *              description: The crop details have been deleted
 *          404:
 *              description: id not found
 */

/**
 * @swagger
 * /farmerprofile/viewcrop/{id}:
 *  put:
 *      summary: Update Crop details
 *      tags: [Crops]
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
 *                      $ref: '#/components/schemas/CropSchema'
 *      responses:
 *          200:
 *              description: The crop details have been updated
 *          404:
 *              description: id not found
 *          500:
 *              some error occured
 */

////////////////////////////////////////////////////////

//ROUTES

router.get('/farmer/:id', (req , res, next)=>{
    Farmer.findById(req.params.id).then((farmer)=>{
        if(farmer){
            res.json(farmer)
        }else{
            res.sendStatus(404);
            res.send("Invalid Id!")
        }
    }).catch(next)
    });
router.post('/farmer',authController.farmer_post);

router.get('/farmers' , (req, res)=>{
    Farmer.find().then((farmers)=>{
        res.json(farmers)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});
router.delete('/farmer/:id' , (req, res,next) =>{
    Farmer.findByIdAndRemove({_id: req.params.id}).then((farmer)=>{
        res.json(farmer)
    });
});


router.put('/farmer/:id', (req,res,next)=>{
    Farmer.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Farmer.findOne({_id: req.params.id}).then((farmer)=>{
            res.json(farmer);
    });
});
});

//CRUD on Crops

router.post('/farmerprofile/addcrop',(req,res)=>{
    var crop = new CropDetail(req.body);
    crop.save().then((crop)=>{
        res.send(crop);
    }).catch((err)=>{
        if(err){
            throw err;
        };
    });
});

router.get('/farmerprofile/viewcrops' , (req, res)=>{
    CropDetail.find().then((crop)=>{
        res.json(crop)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});
router.get('/farmerprofile/viewcrop' , (req, res)=>{
    CropDetail.findById(_id = req.params.id).then((crop)=>{
        res.json(crop)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});

router.delete('/farmerprofile/viewcrop/:id' , (req, res,next) =>{


    CropDetail.findByIdAndRemove({_id: req.params.id}).then((crop)=>{
        res.json(crop)
    }).catch(next);
});


router.put('/farmerprofile/viewcrop/:id', (req,res,next)=>{
    CropDetail.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        CropDetail.findOne({_id: req.params.id}).then((crop)=>{
            res.json(crop);
    }).catch(next);
});
});



module.exports = router;