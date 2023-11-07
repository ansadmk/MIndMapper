'use client'
import { getUsersList, getnotify } from '@/app/redux/Admin/AdminAxioses';
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

const page = () => {
    const dispatch=useDispatch()
    const users=useSelector(getUsersForAdmin)
    
    useEffect(()=>{
        dispatch(getnotify())
        dispatch(getUsersList())
    },[])
    const noti=useSelector(getNotiAdmin)
    console.log(noti);
  return (
    <div className='d-flex align-items-center  h-75'>
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} >{noti?.data?.map(value=>
    <div className='d-flex'>
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
           <React.Fragment>
             <Typography
               sx={{ display: "inline" }}
               component="span"
               variant="body2"
               color="text.primary"
             >
               {value.msg}
               {' '}{' '} {moment(value.time).fromNow()}
             </Typography>
           </React.Fragment>
         }
       />
     </ListItem>
    
     <Divider variant="inset" component="li" />
   </List>
   <div className='d-flex align-items-center'><div> <Button >Delete</Button></div></div>
  

   </div>
  )} </Box>
  </div>
  )
}

export default page