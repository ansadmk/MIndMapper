'use client'

import { getAllPages, getAllPagesPublic } from "@/app/redux/Axioses"
import { CurrentPublicPage, PagesPublic, PublicStatus, allPages, changeCurrentPublicPage } from "@/app/redux/slice"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { styled } from '@mui/material/styles';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar} from "@mui/material"


 const Page = () => {
   const {pageId}=useParams()
   const dispatch=useDispatch()
   useEffect(()=>{
     dispatch(getAllPagesPublic())
  },[dispatch])
 const pages=  useSelector(PagesPublic)
 console.log(pages);
 const [state,setState]=useState(true)
 const [values,setValues]=useState('')
 const handlesub = async (value) => {
     console.log(value.subpages);
     if(state){
    await initializeEditor(value.subpages);
    setState(false)
     }
  
   
  };
  




const initializeEditor = async (value) => {
  const editor = new EditorJS({
    holder: "editorjs",
    
   
    readOnly: true,
    data: value,
   
  });
};


  
 
 
 

 
 
  
   
 
 const current=useSelector(CurrentPublicPage)
 
  console.log(current);
  return (
    <div className="w-100 d-flex justify-content-center align-items-center h-100  ">{pages?.data?.map(value=>value._id==pageId?<div >
      <img
        className="w-50 h-50 rounded-5 img-fluid"
        src={value.cover}
       
      />
    
        <Avatar src={value.avatar}/>
        <Typography gutterBottom variant="h5" component="div">
         {value.content}
        </Typography>
        {pages?.data?.map(value=>value.ansester==pageId && value.role=="sub"? <Button>{value.content}</Button>:null  )}
        <div id="editorjs" className="prose max-w-full min-h-screen w-100 " style={{maxHeight:100}}></div>
        
      
      
      
      
        <Button onClick={()=>handlesub(value)}>Show more</Button>
      
      
    </div>:null)}</div>
  )
}
export default Page