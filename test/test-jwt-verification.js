const expect = require('chai').expect
const jwtVerification = require('../middlewares/jwt-verification')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config.json')

describe('jwtVerification.verifyJWT func test results',()=>{
    it('should throw an error if authorization header is null',()=>{
        const req ={
            get:(authHeader)=>{
                return null
            }
        }
        expect(jwtVerification.verifyJWT.bind(this, req,{},()=>{})).to.throw('Not authenticated.')
    })
    
    it('should throw an error if there is no space in the authorization header string',()=>{
        const req ={
            get:(authHeader)=>{
                return 'abc'
            }
        }
        expect(jwtVerification.verifyJWT.bind(this, req,{},()=>{})).to.throw()
    })

    it('should throw an error if decoded token expired',()=>{
        const req ={
            get:(authHeader)=>{
                return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlcmthbkVyaXMxIiwidXNlcklkIjoiNjA2NDMyN2NiMzBhZjcxODI0YjY5NTBiIiwiaWF0IjoxNjE3MTgwMDkwLCJleHAiOjE2MTcxODM2OTB9.NQGiGMdZe-bQiUSjdoyOokS8HXm3Eyptk8FWDNMdATE'
            }
        }
        expect(jwtVerification.verifyJWT.bind(this, req,{},()=>{})).to.throw('jwt expired')
    })

    it('should gives as userId after decoding the valid token',()=>{
        const token = jwt.sign({
            username:'testuser',
            userId:'1001'
        },
        secretKey,
        {expiresIn:'1h'})

        const req ={
            get:(authHeader)=>{
                return 'Bearer ' + token
            }
        }
        jwtVerification.verifyJWT(req,{},()=>{})
        expect(req).to.have.property('userId')
    })
})
