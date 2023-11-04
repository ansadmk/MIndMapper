const express=require('express')
const router=express.Router()
const {getUsers}=require('../controllers/admin')
const auth = require('../middlewares/userAuth')
router.get('/getUserList',auth,getUsers)
module.exports=router
