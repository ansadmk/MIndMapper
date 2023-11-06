"use client"
import { getUsersList } from '@/app/redux/Admin/AdminAxioses'
import { getUsersForAdmin, setCurrentUser } from '@/app/redux/Admin/adminSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));
const usersList = () => {
  const dispatch=useDispatch()
  const router=useRouter()
  const users=useSelector(getUsersForAdmin)
  console.log(users,"list");
  useEffect(()=>{
    function dis(){dispatch(getUsersList())}
    dis()
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      location.reload(false);
    }
  },[])
  const changeuser=(value)=>{
      dispatch(setCurrentUser(value))
      router.push("/admin/detailsPage")
  }
  return (
    <div className='d-flex align-items-center  h-75'>
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} >{users?.data?.map(value=>
    <Item
      sx={{
        my: 1,
        mx: 'auto',
        p: 2,
      }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar src={value.image} alt='' />
        <Typography noWrap  >{value.username}</Typography>
        <Button onClick={()=>changeuser(value)}>View & Notify</Button>
      </Stack>
    </Item>
    
  )} </Box>
  </div>
  )
}

export default usersList