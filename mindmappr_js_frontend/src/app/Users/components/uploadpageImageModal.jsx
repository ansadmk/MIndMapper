'use client'
import { cloudinary, sendUrl } from '@/app/redux/Axioses';
import { changeuploadcover, cloudResponse, currentPage, modalupload } from '@/app/redux/slice';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UploadpageImageModal = () => {
    
    const [file,setFile]=useState('')
    const [file1,setFile1]=useState('')
    const parent =useSelector(currentPage)
    const open=useSelector(modalupload)
    const url =useSelector(cloudResponse)
    const dispatch=useDispatch()

  const handleClose = () => dispatch(changeuploadcover({avatar:"false"}))

  const handleCloud = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Avatar");
    dispatch(cloudinary(data));

  };
  const handleCloud1 = () => {
    const data = new FormData();
    data.append("file", file1);
    data.append("upload_preset", "Avatar");
    dispatch(cloudinary(data));

  };
  const handleSave= async ()=>{
     const lin= await url.data.secure_url
    setTimeout(()=>{dispatch(sendUrl({pageId:parent._id,avatarUrl:lin}))
    dispatch(changeuploadcover({avatar:"false"}))
  },2000)
    
  }
  const handleSave1=()=>{
    setTimeout(()=>{dispatch(sendUrl({pageId:parent._id,coverUrl:url?.data?.secure_url}))
    dispatch(changeuploadcover({cover:"false"}))
  },2000)
    
  }
  return (
    <div>
        
<Modal
  open={open.avatar}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  
<Box sx={style} className="rounded-5">
  <h1>Icon change</h1>
<Box component="form"
   noValidate
   autoComplete="off"
   className='d-flex  '
  >
   <IconButton className='position-relative '>
   <CloudUploadIcon/>
  <input type="file" style={{opacity:'0'}} className='w-25  position-absolute' onChange={(e)=>setFile(e.target.files[0])}/>
  </IconButton> 
  </Box>
  <Button onClick={()=>handleCloud()}>upload</Button>
  <Button onClick={()=>handleSave()}>save</Button>
        </Box>
  
  
</Modal>
<Modal
  open={open.cover}
  onClose={() => dispatch(changeuploadcover({cover:"false"}))}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  
<Box sx={style} className="rounded-5">
  <h1>Cover change</h1>
<Box component="form"
   noValidate
   autoComplete="off"
   className='d-flex  '
  >
   <IconButton className='position-relative '>
   <CloudUploadIcon/>
  <input type="file" style={{opacity:'0'}} className='w-25  position-absolute' onChange={(e)=>setFile1(e.target.files[0])}/>
  </IconButton> 
  </Box>
  <Button onClick={()=>handleCloud1()}>upload</Button>
  <Button onClick={()=>handleSave1()}>save</Button>
        </Box>
  
  
</Modal>
</div>
    
  )
}

export default UploadpageImageModal