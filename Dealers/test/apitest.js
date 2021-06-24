const chai = require('chai');
const chaiHttp = require('chai-http');
const dealer = require('../dealer');
//const database = require("../routes/dbRoute");
var assert = require("assert");


chai.should(); 
// expect
// assert
chai.use(chaiHttp);


//get dealer
describe('GET /dealers',()=>{
    it('It should Get all data', (done)=>{
        chai.request(dealer)
        .get('/dealers')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
})
//get by id
describe('Get /dealer/:id',()=>{
    it('it should get by id',(done)=>{
        const id = '60d2aa03e3964f45b4d6644f';
        chai.request(dealer)
        .get('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})
//post farmer 
describe('post /dealer',()=>{
    it('it should post data',(done)=>{
        user = {
            name:"dealer189",
            username : "adskkf",
            email:"deal18@gmail.com",
            password:"qwerty"
            
        }
        chai.request(dealer)
        .post('/dealer')
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
}) 
//patch
// describe('patch /dealer/signup',()=>{
//     it('it should patch data',(done)=>{
//         user = {
//             name:"gaurav11",
//         }
//         id = '60cf738182750e46c0ed505d';
//         chai.request(dealer)
//         .patch('/dealer/signup/'+id)
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(200);
//             response.body.should.be.a('object');
            
//         done();
//         })
//     })
// }) 
//delete
describe('delete /dealer/:id',()=>{
    it('it should delete data',(done)=>{
        id = '60cfb1e915905e33bc320a82';
        chai.request(dealer)
        .delete('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})