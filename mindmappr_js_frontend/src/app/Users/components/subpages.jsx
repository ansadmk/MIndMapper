import {
  PageState,
  changeBreadCrumb,
  changeCurrentPage,
  changeEditable,
  changeMainPageListRender,
  changeShowPageForm,
  changesubpageRender,
  currentPage,
  fetchpageres,
} from "@/app/redux/slice";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FetchPages, createPageResponse, deletePage, setprofile } from "@/app/redux/Axioses";

const Subpagescomp = ({value}) => {
  const [state, setState] = useState(false);
  
  const parent = useSelector(currentPage);
  const dispatch = useDispatch();
  const handleStates = (data) => {
    dispatch(PageState(true))

    dispatch(changeCurrentPage(data));
    dispatch(changeBreadCrumb({type:'push',data:{role:"sub",content:data}}))
    dispatch(changeShowPageForm(false));
    dispatch(changeEditable("false"));
    
    dispatch(changeMainPageListRender()); 
  };
  const handleDelete = (data) => {
    dispatch(deletePage({ pageid: data._id, content: data.content }));
    dispatch(changeMainPageListRender());
  };
  const handleChange =(e,val)=>{
    e.preventDefault();
    const content = e.target.content.value;
    if (content) {
      
      dispatch(setprofile({ pageid: val, content: content ,sub:true}));
    }
    dispatch(FetchPages())
    dispatch(PageState(true))
    setState(false)
  }
  const handleChange2 =(e,val)=>{
    e.preventDefault();
    const content = e.target.value;
    dispatch(setprofile({ pageid: val, content: content ,sub:true}));
    dispatch(FetchPages())

    dispatch(PageState(true))

    

    
  }
  return (
    <div>
     
        {value.title == parent._id ? (
          <li>
            { state ?
            <Box
            component="form"
            autoComplete="off"
            onSubmit={(e)=>handleChange(e,value._id)}
          >
              <TextField
              defaultValue={value.content}
          id="content"
          placeholder="Enter your username here"
          onChange={handleChange2}
          variant="filled"
          type='text'
        />
          </Box>:
            <div>
              <Button variant="" onClick={() => handleStates(value)}>
                {value.content}
              </Button>
              <IconButton onClick={() => setState(true)}>
                <EditNoteIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(value)}>
                <DeleteForeverIcon />
              </IconButton>
            </div>}
          </li>
        ) : null}
      
    </div>
  );
};

export default Subpagescomp;
