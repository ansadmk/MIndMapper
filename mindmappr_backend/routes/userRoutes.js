const express=require('express')
const user = require('../controllers/user')
const router=express.Router()
const {register}=user
router.post('/register',register)
module.exports=router
