const { default: axios } = require('axios');
const express = require('express');
const Admin = require('../models/db');
const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      AdminSchema: 
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
 *  name : Admins
 *  description : Admins data managing api
 */

/**
 * @swagger
 * /admins:
 *      get:
 *          summary: Dispalys the list of all Admin
 *          tags: [Admins]
 *          responses:
 *              200:
 *                  description: Admins list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/AdminSchema'
 *                    
 *                       
 */

/**
 * @swagger
 * /admin/{id}:
 *      get:
 *          summary: Get Admin by id
 *          tags : [Admins]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Admin id        
 *          responses:
 *              200:
 *                  description: Admin description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/AdminSchema'
 *              404:
 *                  description: Admin not found                       
 */





router.get('/admin/:id', (req , res)=>{
    Admin.findById(req.params.id).then((admin)=>{
        if(admin){
            res.json(admin);
        }else{
            res.send("Invalid ID!");
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});

router.post('/admin', (req, res )=>{
    var admin = new Admin(req.body);
    admin.save().then((admin)=>{
        res.send(admin);

    }).catch((err)=>{
        if(err){
            throw err;
        };
    });
   
});

router.get('/admins' , (req, res)=>{
    Admin.find().then((admins)=>{
        res.json(admins)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});

/**
 * @swagger
 * /viewfarmer:
 *      get:
 *          summary: Dispalys the list of all Farmers
 *          tags: [Admins]
 *          responses:
 *              200:
 *                  description: Farmers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              
 *                    
 *                       
 */

//axios connection

router.get('/viewfarmer',(req,res,next)=>{
    axios.get("http://localhost:3000/farmers").then((response)=>{
        var viewFarmer = response.data;
        res.send(viewFarmer);

    });
});
router.get('/viewfarmers', authencate , (req,res,next)=>{
    axios.get("http://localhost:3000/farmer/60cf230f9d0a832b54414c9a").then((response)=>{
        var viewFarmer = response.data.name;
        res.send(viewFarmer);
    // axios.get("http://localhost:5000/dealers").then((response)=>{
    //     var viewDealer = response.data;
    //     res.json(viewDealer);
    
    //     });

    });
});


/**
 * @swagger
 * /viewdealer:
 *      get:
 *          summary: Dispalys the list of all Dealers
 *          tags: [Admins]
 *          responses:
 *              200:
 *                  description: Dealers list shown
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          
 *                              
 *                    
 *                       
 */
//Axios connection

router.get('/viewdealer',(req,res,next)=>{
    axios.get("http://localhost:5000/dealers").then((response)=>{
        var viewDealer = response.data;
        res.json(viewDealer);

    });
});


router.delete('/admin/:id' , (req, res) =>{

    Admin.findByIdAndRemove({_id: req.params.id}).then((admin)=>{
        res.json(admin);
    });
});

router.put('/admin/:id', (req,res,next)=>{
    Admin.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Admin.findOne({_id: req.params.id}).then((admin)=>{
            res.json(admin);
    }).catch(next);
});
});

module.exports = router;