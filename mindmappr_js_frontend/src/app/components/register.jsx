"use client"
import React from 'react'
import { Form , Alert, Button} from 'react-bootstrap'


import { Box, TextField } from '@mui/material'
import { axiosInstance } from '../redux/axiosInstance'


const register = ({close}) => {
  
  const handleSub= async (e)=>{
    
    e.preventDefault()
    const username=e.target.username.value
    const email=e.target.email.value
    const password=e.target.password.value
    const confirm=e.target.confirm.value
    
    if(password==confirm){
      
     const res= await axiosInstance.post("/api/user/register",{
      "username":username,
      "email":email,
      "password":password
    })
  
     if(res.data.status=="success"){
          
          alert("successfully registered in")
           close()
     }else{
      
        alert("failed")
     }
    }else{
     
      alert("password does'nt match")
      
      
    }
    

  }
  return (
    
       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      className='p-5 d-flex flex-column gap-2'
      autoComplete="off"
      onSubmit={handleSub}
    >
      
        
      <TextField
          id="username"
          label="Username"
          placeholder="Enter your username here"
         
          variant="filled"
          type='text'
          required
        />
       <TextField
          id="email"
          label="Email"
          placeholder="Enter your email here "
          
          variant="filled"
          type="email"
          required
        />
        <TextField
          id="password"
          label="Password"
          placeholder="Enter your password here"
         required
          variant="filled"
          type="password"
        />
        <TextField
          id="confirm"
          label="Confirm Password"
          placeholder="Confirm your password here"
          required
          variant="filled"
          type="password"
        />
      
       <Button type="submit">submit</Button>
    </Box>
    
   
  )
}

export default register