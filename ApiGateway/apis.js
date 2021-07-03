const express = require('express');
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
const axios = require('axios');
const controller = require('./Controller/AuthControl');
const {farmerAuth} = require('./AuthJwt/UserAuth');
const {adminAuth} = require('./AuthJwt/adminAuth');
const {dealerAuth} = require('./AuthJwt/dealerAuth');
const admin = require('./Controller/AdminController');
const dealer = require('./Controller/DealerController');
const farmer = require('./Controller/FarmerController');
app.use(cookieParser());


//Farmer Login & Signup

router.post('/farmer/signup', controller.farmer_signup_post);
router.post('/farmer/login', controller.farmer_login_post);
router.get('/farmer/logout', controller.farmer_logout_get);


//Admin Login & Signup

router.post('/admin/signup', controller.admin_signup_post);
router.post('/admin/login', controller.admin_login_post);
router.get('/admin/logout', controller.admin_logout_get);


//Dealer Login & Signup

router.post('/dealer/signup', controller.dealer_signup_post);
router.post('/dealer/login', controller.dealer_login_post);
router.get('/dealer/logout', controller.dealer_logout_get);



//PUBLIC ACCESS
router.get('/viewcrop', farmer.viewCrop );


//Admin Functionalities

router.get('/farmer/data',adminAuth, admin.getFarmerData);

router.get('/dealer/data',adminAuth, admin.getDealerData);

router.get('/admin/data',adminAuth, admin.getAdminData);

router.delete('/deletefarmer/:id',adminAuth, admin.deleteFarmer);

router.delete('/deletedealer/:id',adminAuth, admin.deleteDealer);

//DEALER functionalities

router.get('/dealer/searchcrop/:name', dealer.searchCrop);

router.get('/dealer/getcrops', dealer.viewCrop);

router.post('/dealerprofile/buy', dealerAuth, dealer.buyCrop );

//Farmer Functionalities

router.post('/farmerdetail',farmerAuth, farmer.addFarmer);
router.post('/postCrop',farmerAuth, farmer.addCrop);
router.put('/updatefarmerdetail/:id',farmerAuth, farmer.updateFarmer);
router.get('/farmer/myprofile',farmerAuth, farmer.viewProfile );
//router.delete('/deleteCrop/:id',farmerAuth, farmer.deleteCrop);

module.exports = router;

