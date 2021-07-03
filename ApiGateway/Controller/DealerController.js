const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;


module.exports.searchCrop = (req , res )=> { 
    MongoClient.connect(
      'mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectFarmer?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
      function(connectErr, client) {
        const coll = client.db('ProjectFarmer').collection('crops');
        const name = req.params.name
        const query = {cropName : name}
        coll.find(query).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
        client.close();
      });
  })
}

module.exports.viewCrop = (req,res)=>{
    axios.get('http://localhost:3000/viewcrops').then((response)=>{
        res.send(response.data);
    })
}

module.exports.buyCrop = (req,res)=>{
    axios.post('http://localhost:5000/buycrop', req.body).then((response)=>{

     
        res.send(response.data);
    })
}

// module.exports.Updatequantity = (req,res) => {
//   MongoClient.connect(
//     'mongodb+srv://aman09:Amant123@aman-practice.k5xrh.mongodb.net/ProjectFarmer?retryWrites=true&w=majority',
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function(connectErr, client) {
//     const coll = client.db('ProjectFarmer').collection('crops');
    
//   coll.findByIdAndUpdate({_id:req.params.id}, { $inc: {quantity : -req.body.quantity}})
//   .then(
//       data => {

//           res.send("succ")
//       }).catch(err => {
//           res.send("error")

//   })
//   })
// }




// module.exports.bookDetails_post = (req, res) => {
  
//   axios
//     .put(
//       "http://localhost:1001/updateTrainSeat/" + req.body.train_id,
//       { numOfticket: req.body.numOfSeats }
//     )
//     .then((trains) => {
//       if (trains.data === "succ") {
//         const BookingObj = {
//           user_id: req.userId,
//           train_id: req.body.train_id,
//           Departure: new Date(req.body.Departure),
//           numOfSeats: req.body.numOfSeats,
//         };
//         Boooking.create(BookingObj).then((data) => {
//           res.status(200).json({ message: "Ticket Booked Successfully!" });
//         });
//       } else {
//         res.status(205).json({ message: "Ticket Not Booked !" });
//       }
//     });
// };