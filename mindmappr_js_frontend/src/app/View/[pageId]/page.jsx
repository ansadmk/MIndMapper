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
import { Avatar, Collapse, IconButton } from "@mui/material"


 const Page = () => {
   const {pageId}=useParams()
   const dispatch=useDispatch()
   useEffect(()=>{
     dispatch(getAllPagesPublic())
  },[dispatch])
 const pages=  useSelector(PagesPublic)
 const [expanded, setExpanded] = useState(false);

 const handleExpandClick = async (value) => {
     console.log(value.subpages);
    await initializeEditor(value.subpages);
  
  
   setExpanded(!expanded);
  };
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other}  />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));




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
    <div className="w-100 d-flex justify-content-center align-items-center h-100  ">{pages?.data?.map(value=>value._id==pageId?<Card className="w-75">
      <CardMedia
        sx={{ height: 500 }}
        image={value.cover}
        title="green iguana"
      />
      <CardContent>
        <Avatar src={value.avatar}/>
        <Typography gutterBottom variant="h5" component="div">
         {value.content}
        </Typography>
        <div id="editorjs" className="prose max-w-full min-h-screen w-100"></div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        
        
        <div id="editorjs" className="prose max-w-full min-h-screen w-100"></div>
      
        </CardContent>
      </Collapse>
      </CardContent>
      
      <CardActions disableSpacing>
      
        <ExpandMore
          expand={expanded}
          onClick={()=>handleExpandClick(value)}
          aria-expanded={expanded}
          aria-label="show more"
          
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        
        
        <div id="editorjs" className="prose max-w-full min-h-screen w-100"></div>
      
        </CardContent>
      </Collapse> */}
    </Card>:null)}</div>
  )
}
export default Page