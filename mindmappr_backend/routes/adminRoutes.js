const express=require('express')
const router=express.Router()
const {getUsers,notify,getNoti,deleteNoti}=require('../controllers/admin')
const auth = require('../middlewares/Auth')
const handle = require('../middlewares/ErrorHandler')
router.post('/getUserList',auth,handle(getUsers))
router.post('/notify',auth,handle(notify))
router.get('/getNoti',auth,handle(getNoti))
router.delete('/deleteNoti/:id',auth,handle(deleteNoti))


module.exports=router
