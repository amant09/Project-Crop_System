const express = require('express');
const axios = require('axios');
const router = express.Router();
const controller = require('./Controller/ApiControl');
const {requireAuth} = require('./AuthJwt/UserAuth')


router.get('/signup', controller.signup_get);
router.post('/signup', controller.signup_post);
router.get('/login', controller.login_get);
router.post('/login', controller.login_post);

router.get('/farmer/data',requireAuth, controller.getFarmerData);

router.get('/dealer/data',requireAuth, controller.getDealerData);

router.get('/admin/data',requireAuth, controller.getAdminData);

router.get('/dealer/searchcrop/:name',requireAuth, controller.searchCrop)

//Post dealer
router.post('/dealer/add',(req,res)=>{
    axios.post('http://localhost:5000/dealer/signup',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Post farmer
router.post('/farmer/add',(req,res)=>{
    axios.post('http://localhost:3000/farmer/signup',req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch farmer
router.patch('/farmer/update/:id',(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:3000/farmer/signup'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})

//Patch dealer
router.patch('/dealer/update/:id',(req,res)=>{
    const id = req.params.id;
    axios.patch('http://localhost:5000/dealer/signup'+id,req.body).then((response)=>{
        res.send(response.data);
    })
})
















module.exports = router