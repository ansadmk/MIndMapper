const express=require('express')
const user = require('../controllers/user')
const auth = require('../middlewares/userAuth')
const router=express.Router()
const {register,login,userDetails}=user
router.post('/register',register)
router.post('/login',login)
router.get('/userDetails',userDetails)
module.exports=router
