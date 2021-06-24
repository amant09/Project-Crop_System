
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type : String,
        required : true
    }

});


const Admin = mongoose.model('admin', AdminSchema);
   
module.exports = Admin;