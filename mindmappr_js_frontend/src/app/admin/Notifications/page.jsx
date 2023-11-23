'use client'
import { deletenotify, getUsersList, getnotify } from '@/app/redux/Admin/AdminAxioses';
import { getNotiAdmin, getUsersForAdmin } from '@/app/redux/Admin/adminSlice';
import styled from '@emotion/styled';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
  }));

const Page = () => {
    const dispatch=useDispatch()
    const users=useSelector(getUsersForAdmin)
    
    useEffect(()=>{
        dispatch(getnotify())
        dispatch(getUsersList())
    },[dispatch])
    const noti=useSelector(getNotiAdmin)
  const handleDelete=(id)=>{
    dispatch(deletenotify(id))
    dispatch(getnotify())
    dispatch(getUsersList())
  }
  return (
    <div className='d-flex align-items-center  h-75'>
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} >{noti?.data?.map((value,i)=>
    <div className='d-flex' key={i}>
     <List
     sx={{
       width: "100%",
       maxWidth: 360,
       bgcolor: "background.paper",
     }}
     className=''
   >
     <ListItem alignItems="flex-start">
       <ListItemAvatar>
         <Avatar
           alt="Remy Sharp"
           src={value.type=="public"?null:users?.data?.filter(val=>val._id==value.to)[0]?.image}
         />
         {value.type=="public"?"public":users?.data?.filter(val=>val._id==value.to)[0]?.username}
       
       </ListItemAvatar>
       <ListItemText
         primary={value.sub}
         secondary={
           <div>
             <Typography
               sx={{ display: "inline" }}
               component="span"
               variant="body2"
               color="text.primary"
             >
               {value.msg}
               {' '}{' '} {moment(value.time).fromNow()}
             </Typography>
           </div>
         }
       />
     </ListItem>
    
     <Divider variant="inset" component="li" />
   </List>
   <div className='d-flex align-items-center'><div> <Button onClick={()=>handleDelete(value._id)}>Delete</Button></div></div>
  

   </div>
  )} </Box>
  </div>
  )
}

export default Page