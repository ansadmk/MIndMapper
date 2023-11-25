require('dotenv').config()
const mongoose=require('mongoose')
const cors=require('cors')

mongoose.connect(process.env.DATABASE_ADDRESS)
const express=require('express')
const app=express()
const admin=require('./routes/adminRoutes')
const user=require('./routes/userRoutes')

app.use(cors());

app.use(express.json())
app.use('/api/admin',admin)
app.use('/api/user',user)
app.listen(process.env.PORT,()=>console.log('listening on 4000'))