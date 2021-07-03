const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;


module.exports.addFarmer = (req,res)=>{
    axios.post('http://localhost:3000/farmerprofile', req.body).then((response)=>{
        res.status(200).send({message: `Farmer ${response.data.Name} added successfully! `});
    })
}

module.exports.updateFarmer = (req,res)=>{
    
    axios.put('http://localhost:3000/farmerprofile/'+req.params.id, req.body).then((response)=>{
        res.status(200).send({message: `Update Success ${response.data.Name}`});
    })
}

module.exports.viewProfile = (req,res)=>{
    axios.get('http://localhost:3000/farmerprofile').then((response)=>{
        res.send(response.data);
    })
}


//Crops Added By Farmer
module.exports.viewCrop = (req,res)=>{
    axios.get('http://localhost:3000/viewcrops').then((response)=>{
        res.send(response.data);
    })
}
module.exports.addCrop = (req,res)=>{
    axios.post('http://localhost:3000/addcrop', req.body).then((response)=>{
        res.send(`${response.data.cropName} Crop Added Succsefully`);
    })
}


module.exports.addCrop = (req,res)=>{
    const id = req.params.id;
    axios
    .post('http://localhost:3000//farmerprofile/viewcrop/'+id,)
    .then((response)=>{
        res.send(`${response.data.cropName} Crop Removed Succsefully`);
    })
}
