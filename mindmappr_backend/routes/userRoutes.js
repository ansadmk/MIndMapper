const express=require('express')
const user = require('../controllers/user')
const router=express.Router()
const {register,login}=user
router.post('/register',register)
router.post('/login',login)
router.get('/userDetails')
module.exports=router
