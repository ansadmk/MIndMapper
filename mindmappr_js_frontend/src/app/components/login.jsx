"use client"
import React from 'react'
import { Form ,Button} from 'react-bootstrap'
import Sign from './sign'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux'
import { FetchPages, FetchUsers } from '../redux/Axioses'
import { changeMainPageListRender } from '../redux/slice'

const login = () => {
const router =useRouter()
const dispatch=useDispatch()

const handlesub=async(e)=>{
  
  e.preventDefault()
  const username=e.target.username.value
  const password=e.target.password.value
  
  const res=await axios.post("http://127.0.0.1:4000/api/user/login",{
    "username":username,
    "password":password
  })
  
  if(res.data.status==="success"){

   
    if(res.data.message=="adminlogged"){
      setCookie("adminToken",res.data.jwt_token)
    
    alert("logged in success for Admin")
    setCookie("token",res.data.jwt_token)
    
    alert("logged in success")
      router.push("/admin")
    }
    else{
   router.push("/Users")}
   
  }
  else{
    alert("failed")
  }
}
  return (
    <form className='p-5 d-flex flex-column gap-2' onSubmit={handlesub} >
        <input type="text" placeholder="username" id="username" className='mb-2' />
        <input type="password" placeholder='password' id='password' />
       <Button variant='secondary' className='w-100 m-auto mt-4' type='submit'>Continue</Button>
      <Sign/>
      

    </form>
  )
}

export default login