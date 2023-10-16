"use client"
import React from 'react'
import { Form , Alert} from 'react-bootstrap'
import Sign from './sign'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const register = () => {
  const router=useRouter()
  const handleSub= async (e)=>{
    console.log('hi');
    e.preventDefault()
    const username=e.target.username.value
    const email=e.target.email.value
    const password=e.target.password.value
    const confirm=e.target.confirm.value
    
    if(password==confirm){
      
     const res= await axios.post("http://127.0.0.1:4000/api/user/register",{
      "username":username,
      "email":email,
      "password":password
    })
     if(res.data.status=="success"){
          router.push("/Users");
          alert("successfully logged in")
     
     }else{
      
        alert("failed")
     }
    }else{
      console.log('alert');
      alert("password does'nt match")
      
      
    }
    

  }
  return (
    <form className='p-5 d-flex flex-column gap-2' onSubmit={(e)=>handleSub(e)}>
        <input type="text" placeholder="username" id="username" className='mb-2' />
        <input type="email" placeholder="email" id="email" className='mb-2' />
        <input type="password" placeholder='password' id='password' />
        <input type="password" placeholder="confirm" id="confirm" className='mt-2' />
       <input className='w-100 m-auto mt-4' type='submit' value="submit"/>
       <Sign/>
    </form>
  )
}

export default register