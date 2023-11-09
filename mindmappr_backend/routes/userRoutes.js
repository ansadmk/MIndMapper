const express=require('express')
const user = require('../controllers/user')
const auth = require('../middlewares/userAuth')
const handle = require('../middlewares/ErrorHandler')
const router=express.Router()
const {register,login,userDetails,createPages,fetchpages,setProfile,setCoverAvatar,deletePage,fetchSpecpages,getNoti}=user

router.post('/register',handle(register))
router.post('/login',handle(login))
router.get('/userDetails',auth,handle(userDetails))
router.post('/createPage',auth,handle(createPages))
router.get('/getPages',auth,handle(fetchpages))
router.get('/getPages/:id',auth,handle(fetchSpecpages))
router.patch('/setprofile',auth,handle(setProfile))
router.delete('/deletepage/:id/:content',auth,handle(deletePage))
router.put('/coveravatar',auth,handle(setCoverAvatar))
router.get('/getUsersNoti',auth,handle(getNoti))
module.exports=router
