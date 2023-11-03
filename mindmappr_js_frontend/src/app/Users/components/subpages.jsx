// import {
//   PageState,
//   changeBreadCrumb,
//   changeCurrentPage,
//   changeEditable,
//   changeMainPageListRender,
//   changeShowPageForm,
//   changesubpageRender,
//   currentPage,
//   fetchpageres,
// } from "@/app/redux/slice";
// import { Box, IconButton, TextField } from "@mui/material";
// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { FetchPages, createPageResponse, deletePage, setprofile } from "@/app/redux/Axioses";

// const Subpagescomp = ({value}) => {
//   const [state, setState] = useState(false);
  
//   const parent = useSelector(currentPage);
//   const dispatch = useDispatch();
//   const handleStates = (data) => {
//     dispatch(PageState(true))

//     dispatch(changeCurrentPage(data));
//     dispatch(changeBreadCrumb({type:'push',data:{role:"sub",content:data}}))
//     dispatch(changeShowPageForm(false));
//     dispatch(changeEditable("false"));
    
//     dispatch(changeMainPageListRender()); 
//   };
//   const handleDelete = (data) => {
//     dispatch(deletePage({ pageid: data._id, content: data.content }));
//     dispatch(changeMainPageListRender());
//   };
//   const handleChange =(e,val)=>{
//     e.preventDefault();
//     const content = e.target.content.value;
//     if (content) {
      
//       dispatch(setprofile({ pageid: val, content: content ,sub:true}));
//     }
//     dispatch(FetchPages())
//     dispatch(PageState(true))
//     setState(false)
//   }
//   const handleChange2 =(e,val)=>{
//     e.preventDefault();
//     const content = e.target.value;
//     dispatch(setprofile({ pageid: val, content: content ,sub:true}));
//     dispatch(FetchPages())

//     dispatch(PageState(true))

    

    
//   }
//   return (
//     <div>
     
//         {value.title == parent._id ? (
//           <li>
//             { state ?
//             <Box
//             component="form"
//             autoComplete="off"
//             onSubmit={(e)=>handleChange(e,value._id)}
//           >
//               <TextField
//               defaultValue={value.content}
//           id="content"
//           placeholder="Enter your username here"
//           onChange={handleChange2}
//           variant="filled"
//           type='text'
//         />
//           </Box>:
//             <div>
//               <Button variant="" onClick={() => handleStates(value)}>
//                 {value.content}
//               </Button>
//               <IconButton onClick={() => setState(true)}>
//                 <EditNoteIcon />
//               </IconButton>
//               <IconButton onClick={() => handleDelete(value)}>
//                 <DeleteForeverIcon />
//               </IconButton>
//             </div>}
//           </li>
//         ) : null}
      
//     </div>
//   );
// };
"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import { useDispatch, useSelector } from "react-redux";
import { currentPage } from "@/app/redux/slice";
import { setprofile } from "@/app/redux/Axioses";




const Subpagescomp = () => {
const [state,setState]=useState(null)
const [show,setShow]=useState(true)

const dispatch = useDispatch();

const parent=useSelector(currentPage)
console.log(parent.subpages);



  const initializeEditor = async () => {
   
   
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          table: Table,
          
          
        },
        autofocus:true,
        data:parent.subpages,
        onReady:()=>setState(editor),
        onChange:async ()=>{
          let data=await editor.saver.save()
          dispatch(setprofile({pageid:parent._id,test:data}))
        }
       
      });
     
     
    
  };

 

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if(state==null && parent.subpages){
      init();}
      
      
    
  });

  const save = async () => {
    if (state) {
      state.save().then(async (outputData) => {
       dispatch(setprofile({pageid:parent._id,test:outputData}))
       
      });
    }
  };
 

  return (
    <>
      <div className="container w-100">
       {show ? <div id="editorjs" className="prose max-w-full min-h-screen"></div>: <div>{}</div>}
      </div>
      <button onClick={save}>Save</button>
      <button onClick={()=>setShow(true)}>Save</button>
    </>
  );
} 


export default Subpagescomp;
