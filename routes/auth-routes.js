const express = require('express')
const authController = require('../controllers/auth-controller')
const jwtVerification = require('../helpers/jwt-verification')

const router = express.Router()


router.post('/register',authController.register)
router.post('/login',authController.login)

//This route cant access without token (added for sample verification)
router.get('/get-data',jwtVerification.verifyJWT,authController.getData)

module.exports = router