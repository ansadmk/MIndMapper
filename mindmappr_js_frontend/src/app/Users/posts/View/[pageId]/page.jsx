'use client'

import { getAllPages } from "@/app/redux/Axioses"
import { CurrentPublicPage, allPages, changeCurrentPublicPage } from "@/app/redux/slice"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"




export const page = () => {
  const {pageId}=useParams()
 const dispatch=useDispatch()
 useEffect(()=>{
    dispatch(getAllPages())
 },[])
 const pages=useSelector(allPages)
 useEffect(()=>{
    dispatch(changeCurrentPublicPage(pages.data.filter(value=>value._id==pageId)))
 },[])
 const current=useSelector(CurrentPublicPage)
  return (
    <div>page</div>
  )
}
