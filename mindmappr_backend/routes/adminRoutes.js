const express=require('express')
const router=express.Router()
const {getUsers,notify}=require('../controllers/admin')
const auth = require('../middlewares/userAuth')
router.get('/getUserList',auth,getUsers)
router.post('/notify',auth,notify)

module.exports=router
