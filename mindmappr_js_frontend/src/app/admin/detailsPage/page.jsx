"use client"
import { Box, IconButton, TextField, Card,CardMedia,Typography,CardContent,CardActions,Button} from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '@/app/redux/Admin/adminSlice';
import { useRouter } from 'next/navigation';
import { notify } from '@/app/redux/Admin/AdminAxioses';
import Link from 'next/link';
import Container from '@mui/material/Container';

const page = () => {
  const router=useRouter()
  const dispatch=useDispatch()
  const user=useSelector(currentUser)
  const handleNoti=(e)=>{
    e.preventDefault()
    const msg=e.target.val.value
    const sub=e.target.sub.value
     dispatch(notify({msg:msg,sub:sub,type:true,to:user.value._id}))
     router?.push('/admin')
  }
  return (
    <div className='d-flex h-75  container justify-content-center align-items-center'>
      {user.value ?null:router?.push('/admin')}
      <div className="w-50 d-flex justify-content-center container flex-sm-column  align-items-center   h-100  mt-5"><div className="w-100 row  gap-5 rounded-5 justify-content-center align-items-center h-100 me-5" >
      <Container className='border'>
      <img
        className="w-50 h-50 rounded-5 img-fluid"
        src={user?.value?.image}
       
      />
    
    <Typography gutterBottom variant="h5" component="div" className=''>
       <h1 className='border-bottom border-5'>Name</h1> {user?.value?.username}
      </Typography>
      </Container>
      <div className=' border '>
      <h1 className='border-bottom border-5'>Pages</h1>
      <ol>
      
     {
      user?.page?.map(value=><li><Link href={`/view/${value._id}`}>{value.content}</Link></li>)
     }
      
      </ol>
      </div>
      
      <div className='h-75 d-flex justify-content-center align-items-center flex-column gap-0  border '>
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
        
      
      
    </div></div>
   
  </div> 
  )
}

export default page