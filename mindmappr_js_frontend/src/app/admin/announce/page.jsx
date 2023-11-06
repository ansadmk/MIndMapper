"use client"
import { Box, IconButton, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { DisplaySettingsSharp } from '@mui/icons-material';
import { notify } from '@/app/redux/Admin/AdminAxioses';

const page = () => {
  const dispatch=useDispatch()
  const handleNoti=(e)=>{
    e.preventDefault()
    const msg=e.target.val.value
    console.log(msg);
    dispatch(notify(msg))
  }
  return (
    <div className='h-75 d-flex justify-content-center align-items-center flex-column gap-0 '>
      <h1>Notify Every User</h1>
        <Box
      component="form"
      noValidate
      autoComplete="off"
      className=' d-flex justify-content-center align-items-center mt-3 me-3'
      onSubmit={handleNoti}
    >
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