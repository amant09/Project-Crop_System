//const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;


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
        
