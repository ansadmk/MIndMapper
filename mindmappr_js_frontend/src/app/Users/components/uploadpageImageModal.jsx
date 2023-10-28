'use client'
import { Box, Button, IconButton, Modal } from '@mui/material';
import React, { useState } from 'react'

const uploadpageImageModal = () => {
    const [open, setOpen] = useState(false);
    const [file,setFile]=useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloud = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Avatar");
    dispatch(cloudinary(data));

  };
  const handleSave=()=>{
    
  }
  return (
    <div>
        <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
>
  <Box component="form">
   <IconButton>
  <input type="file" className='d-none' onChange={(e)=>setFile(e.target.files[0])}/>
  </IconButton> 
  </Box>
  <Button onClick={()=>handleCloud()}>upload</Button>
  <Button onClick={()=>handleSave()}>save</Button>
</Modal>
    </div>
  )
}

export default uploadpageImageModal