const express=require('express')
const router=express.Router()
const {getUsers,notify,getNoti,deleteNoti}=require('../controllers/admin')
const auth = require('../middlewares/userAuth')
router.get('/getUserList',auth,getUsers)
router.post('/notify',auth,notify)
router.get('/getNoti',auth,getNoti)
router.delete('/deleteNoti',auth,deleteNoti)


module.exports=router
