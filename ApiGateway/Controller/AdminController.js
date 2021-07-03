const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

//Get Data

module.exports.getAdminData = (req, res)=>{
    axios.get('http://localhost:4000/admins').then((response)=>{
        res.send(response.data);
    })
}
module.exports.getFarmerData = (req, res)=>{
    axios.get('http://localhost:3000/farmers').then((response)=>{
        res.send(response.data);
    })
}

module.exports.getDealerData = (req, res)=>{
    axios.get('http://localhost:5000/dealers').then((response)=>{
        res.send(response.data);
    })
}


//Delete Data

module.exports.deleteFarmer = (req, res)=>{
    const id = req.params.id;
    axios.delete('http://localhost:3000/farmer/'+id,).then((response)=>{
        res.send(`Farmer ${response.data.name} deleted`);
    })
}


module.exports.deleteDealer = (req, res)=>{
    const id = req.params.id;
    axios.delete('http://localhost:5000/dealer/'+id,).then((response)=>{
        res.send(`Dealer ${response.data.name} deleted`);
    })
}


module.exports.getDealerData = (req, res)=>{
    axios.get('http://localhost:5000/dealers').then((response)=>{
        res.send(response.data);
    })
}



module.exports.getDealerData = (req, res)=>{
    axios.get('http://localhost:5000/dealers').then((response)=>{
        res.send(response.data);
    })
}