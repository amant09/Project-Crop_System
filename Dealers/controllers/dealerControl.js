//const axios = require('axios');
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
          coll.find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
          client.close();
        });
    })
}

module.exports.buyCrop =  (req, res)=>{
  const crop = req.body;
  Crop.create(crop).then((response)=>{ 
      if(crop.quantity == 325 && crop.cropName == "Wheat"){
          
          res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!
          Your Bill is Rs. ${crop.quantity*18}`);
      }
      else if(crop.quantity == 150 && crop.cropName == "Wheat"){
          
          res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!
          Your Bill is Rs. ${crop.quantity*18}`);
      }
      else if(crop.quantity >= 500 && crop.cropName == "Wheat"){
          res.send(`OOPS! We are out of Stock!

          Inconveniece is deeply regreted`)
      }
      if(crop.quantity == 7 && crop.cropName == "Peas"){
          
          res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!

          Your Bill is Rs. ${crop.quantity*20}`);
      }
      else if(crop.quantity == 50 && crop.cropName == "Mango"){
          
          res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!

          Your Bill is Rs. ${crop.quantity*40}`);
      }
      else if(crop.quantity == 20 && crop.cropName == "Potato"){
          
          res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!

          Your Bill is Rs. ${crop.quantity*16}`);
      }
      else if(crop.quantity == 15 && crop.cropName == "Chana Dal"){
          
          res.status(201).send(`Thankyou for Ordering ${crop.cropName} with us!

          Your Bill is Rs. ${crop.quantity*85}`);
      }
      else if(crop.quantity >= 70 && crop.cropName == "Mango"){
          res.send(`OOPS! We are out of Stock!
          Inconveniece is deeply regreted`)
      }
      else{
          res.send("You have not entered correct data!")
      }
      

  }).catch((err)=>{
      if(err){
          throw err; 
      };
  });
}
        
