'use client'

import { getAllPages, getAllPagesPublic } from "@/app/redux/Axioses"
import { CurrentPublicPage, PagesPublic, PublicStatus, allPages, changeCurrentPublicPage } from "@/app/redux/slice"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"




 const Page = () => {
   const {pageId}=useParams()
   const dispatch=useDispatch()
   useEffect(()=>{
    dispatch(getAllPagesPublic())
  },[dispatch])
 const pages=  useSelector(PagesPublic)


 
 
 

 
 
  
   
 
 const current=useSelector(CurrentPublicPage)
 
  console.log(current);
  return (
    <div>{pages?.data?.map(value=>value._id==pageId?<h1 onLoad={()=>dispatch(changeCurrentPublicPage ({type:'push',data:{role:"sub",content:data}}))}>{value.content}</h1>:null)}</div>
  )
}
export default Page