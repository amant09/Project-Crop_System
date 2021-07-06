const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const {Crop} = require('../models/db')


module.exports.searchCrop = (req , res )=> {
    
      
      MongoClient.connect(
        'mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectFarmer?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
        //   assert.equal(null, connectErr);
          const coll = client.db('ProjectFarmer').collection('crops');
          const name = req.params.name;
          const query = {cropName : name}
          coll.findOne(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            console.log(result.price);
          client.close();
        });
    })
}
const url = 'mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectFarmer?retryWrites=true&w=majority'

module.exports.buyCrop =  (req, res)=>{
  const crop = req.body;
  Crop.create(crop).then((response)=>{ 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("ProjectFarmer");
        dbo.collection("crops").findOne({cropName: crop.cropName}, function(err, result) {
          if (err) throw err;
          const price = result.price;
          console.log(price)
          db.close();
       
   
          
      res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!

Item ID: ${response._id}

Your Bill is Rs. ${crop.quantity*price}`); 
});
    });


  }).catch((err)=>{
      if(err){
          throw err; 
      };
  });
}
        
