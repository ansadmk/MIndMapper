"use client"
import { Box, IconButton, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { DisplaySettingsSharp } from '@mui/icons-material';
import { notify } from '@/app/redux/Admin/AdminAxioses';
import { useRouter } from 'next/navigation';


const page = () => {
  const dispatch=useDispatch()
  const router=useRouter()
  const handleNoti=(e)=>{
    e.preventDefault()
    const msg=e.target.val.value
    const sub=e.target.sub.value
   
    dispatch(notify({msg:msg,sub:sub,type:false}))
    router?.push('/admin')
  }
  return (
    <div className='h-75 d-flex justify-content-center align-items-center flex-column gap-0 '>
      <h1>Notify Every User</h1>
        <Box
      component="form"
      noValidate
      autoComplete="off"
      className=' d-flex flex-column justify-content-center align-items-center mt-3 me-3'
      onSubmit={(e)=>handleNoti(e)}
    >
      <TextField id="sub" label="subject"  variant="outlined" /> <br />
       <TextField
          id="val"
          label="Type your Updates here"
          multiline
          rows={4}
          
        />
        <IconButton type='submit'><SendIcon/></IconButton>
    </Box>
    </div>
  )
}

export default page