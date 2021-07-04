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
        const id = '60e1caf944c68a5ccc5dae19';
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
            username : "dealertest2",
            email:"deal218@test.com",
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
describe('put /dealer/:id',()=>{
    it('it should update data',(done)=>{
        user = {
            name:"dealtest",
            username: "test1"
        }
        id = '60e1d019168431331840b362';
        chai.request(dealer)
        .put('/dealer/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            
        done();
        })
    })
}) 


//delete
describe('delete /dealer/:id',()=>{
    it('it should delete data',(done)=>{
        id = '60e1caf944c68a5ccc5dae19';
        chai.request(dealer)
        .delete('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})

describe('delete /dealer/:id',()=>{
    it('it should not delete data',(done)=>{
        id = '60e1caf944c68a5ccc5dae';
        chai.request(dealer)
        .delete('/dealer/'+id)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
})