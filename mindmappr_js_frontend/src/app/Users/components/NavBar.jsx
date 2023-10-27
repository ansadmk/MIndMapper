'use client'
import { deletePage } from '@/app/redux/Axioses'
import { changeMainPageListRender, currentPage } from '@/app/redux/slice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


const NavBar = () => {
  const dispatch=useDispatch()
  const page=useSelector(currentPage)
  const router=useRouter()
  console.log(page);
  const handle=()=>{
    dispatch(deletePage({pageid:page._id,content:page.content}))
    dispatch(changeMainPageListRender())
     
  }
  return (
    <div className='d-flex justify-content-end w-100 '>
    <Button variant='' onClick={()=>handle()} className='me-5'>
    🗑
    </Button>
    </div>
  )
}

export default NavBar