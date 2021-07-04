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
        id = '60d2d01bf77eac55f8acd8d4';
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
//             name:"admin1",
//             username: "newadmintest",
//             email:"admintest128@gmail.com",
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
            
            email: "admintest@abc.com",
            password: "123admin"
        }
        id = '60cb3c673fd9071bb847ee30';
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


describe('put /admin/:id',()=>{
    it('it should not update data',(done)=>{
        user = {
            email: "admintest@abc.com",
            password: "123admin"
        }
        id = '60cb3c673fd9071bb847e';
        chai.request(admin)
        .put('/admin/'+id)
        .send(user)
        .end((err,response)=>{
            response.should.have.status(404);
           
            
        done();
        })
    })
}) 
//delete
describe('delete /admin/:id',()=>{
    it('it should delete data',(done)=>{
        id = '60d2d0bcb32bd85e683c098b';
        chai.request(admin)
        .delete('/admin/'+id)
        .end((err,response)=>{
            response.should.have.status(200);
        done();
        })
    })
})



describe('delete /admin/:id',()=>{
    it('it should not delete data',(done)=>{
        id = '60d2d0bcb32bd85e683c0';
        chai.request(admin)
        .delete('/admin/'+id)
        .end((err,response)=>{
            response.should.have.status(404);
        done();
        })
    })
})