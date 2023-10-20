const express=require('express')
const user = require('../controllers/user')
const auth = require('../middlewares/userAuth')
const router=express.Router()
const {register,login,userDetails,createPages,fetchpages}=user
router.post('/register',register)
router.post('/login',login)
router.get('/userDetails',auth,userDetails)
router.post('/createPage',auth,createPages)
router.get('/getPages',auth,fetchpages)
module.exports=router
