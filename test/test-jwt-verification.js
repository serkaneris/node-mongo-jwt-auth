const expect = require('chai').expect
const jwtVerification = require('../middlewares/jwt-verification')

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
})
