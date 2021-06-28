const chai = require('chai');
const chaiHttp = require('chai-http');
const admin = require('../admin');
//const database = require("../routes/dbRoute");
var assert = require("assert");


chai.should(); 
// expect
// assert
chai.use(chaiHttp);


//get admins
describe('Get /admins',()=>{
    it('it should get all data',(done)=>{
        chai.request(admin)
        .get('/admins')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
})
//get by id
describe('Get /admin/:id',()=>{
    it('it should get by id',(done)=>{
        id = '60d2d002f77eac55f8acd8d2';
        chai.request(admin)
        .get('/admin/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
        done();
        })
    })
})
//post admin 
// describe('post /admin',()=>{
//     it('it should post data',(done)=>{
//         user = {
//             name:"admins1",
//             username: "newadmin",
//             email:"admin128@gmail.com",
//             password:"qwerty"
            
//         }
//         chai.request(admin)
//         .post('/admin')
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//         done();
//         })
//     })
// }) 
//patch
describe('put /admin/:id',()=>{
    it('it should update data',(done)=>{
        user = {
            name:"Aman11 Tiwari",
        }
        id = '60d2d01bf77eac55f8acd8d4';
        chai.request(admin)
        .put('/admin/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            
        done();
        })
    })
}) 
//delete
describe('delete /admin/:id',()=>{
    it('it should delete data',(done)=>{
        id = '60cb38ac022274307cd4c52c';
        chai.request(admin)
        .delete('/admin/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})