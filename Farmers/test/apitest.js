const chai = require('chai');
const chaiHttp = require('chai-http');
const farmer = require('../farmer');
//const database = require("../routes/dbRoute");
var assert = require("assert");


chai.should(); 
// expect
// assert
chai.use(chaiHttp);


//get farmer
describe('Get /farmers',()=>{
    it('it should get all data',(done)=>{
        chai.request(farmer)
        .get('/farmers')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
})
//get by id
describe('Get /farmer/:id',()=>{
    it('it should get by id',(done)=>{
        id = '60d2b3c87d5ac74e7807b23e';
        chai.request(farmer)
        .get('/farmer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})
//post farmer 
// describe('post /farmer',()=>{
//     it('it should post data',(done)=>{
//         user = {
//             name:"farmer618",
//             username: "ftthh",
//             email:"farm168@gmail.com",
//             password:"qwerty"
//         }
//         chai.request(farmer)
//         .post('/farmer')
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//         done();
//         })
//     })
// }) 
//patch
describe('put /farmer/:id',()=>{
    it('it should update data',(done)=>{
        user = {
            name:"Aman1test",
            username: "test1"
        }
        id = '60dc8cfa6197824630f8e6f0';
        chai.request(farmer)
        .put('/farmer/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            
        done();
        })
    })
}) 
//delete
describe('delete /farmer/:id',()=>{
    it('it should delete data',(done)=>{
        id = '60cf93011f7b23436871cf29';
        chai.request(farmer)
        .delete('/farmer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})


describe('delete /farmer/:id',()=>{
    it('it should not delete data',(done)=>{
        id = '60cf93011f7b23436871c';
        chai.request(farmer)
        .delete('/farmer/'+id)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
})