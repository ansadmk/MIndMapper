'use client'
import { deletePage } from '@/app/redux/Axioses'
import { Breadcrumb, changeBreadCrumb, changeCurrentPage, changeMainPageListRender, currentPage } from '@/app/redux/slice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const NavBar = () => {
  const dispatch=useDispatch()
  const page=useSelector(currentPage)
  const crumb=useSelector(Breadcrumb)
   
  console.log(page);
  const handle=()=>{
    dispatch(deletePage({pageid:page._id,content:page.content}))
    dispatch(changeMainPageListRender())
     
  }
  const handleCrumb=(d,index)=>{
        dispatch(changeCurrentPage(d))
        dispatch(changeBreadCrumb({type:'select',data:index}))
  }
  return (
    <div className='d-flex justify-content-end w-100 p-0 position-absolute top-0 mt-3'>
      <div  className='me-5 d-flex justify-content-end w-100'>
        <div className='d-flex'>
         {
          crumb?.map((data,index)=><Button variant='' onClick={()=>handleCrumb(data.content,index)}  className='nav-link'>{data?.content?.content} /</Button>)
         }
        </div>
      <Button variant='' onClick={()=>handle()}>
    <DeleteForeverIcon/>
    </Button>
      </div>
    
    </div>
  )
}

export default NavBar