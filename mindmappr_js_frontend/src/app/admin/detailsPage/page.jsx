"use client"
import { Box, IconButton, TextField, Card,CardMedia,Typography,CardContent,CardActions,Button} from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '@/app/redux/Admin/adminSlice';
import { useRouter } from 'next/navigation';
import { notify } from '@/app/redux/Admin/AdminAxioses';

const page = () => {
  const router=useRouter()
  const dispatch=useDispatch()
  const user=useSelector(currentUser)
  const handleNoti=(e)=>{
    e.preventDefault()
    const msg=e.target.val.value
    const sub=e.target.sub.value
     dispatch(notify({msg:msg,sub:sub,type:true,to:user.value._id}))
     router.push('/admin')
  }
  return (
    <div className='d-flex h-75 justify-content-center align-items-center'>
      {user.value ?null:router.push('/admin')}
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={user?.value?.image}
      title="image"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user?.value?.username}
      </Typography>
      <h1 className='border-bottom border-5'>pages</h1>
      <ol>
      
     {
      user?.page?.map(value=><li>{value.content}</li>)
     }
      
      </ol>
      <div className='h-75 d-flex justify-content-center align-items-center flex-column gap-0 '>
      <h1 className='border-bottom border-5'>Notify User</h1>
        <Box
      component="form"
      noValidate
      autoComplete="off"
      className=' d-flex flex-column justify-content-center align-items-center mt-3 me-3'
      onSubmit={handleNoti}
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
    </CardContent>
    
  </Card></div>
  )
}

export default page