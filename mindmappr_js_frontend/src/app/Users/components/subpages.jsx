import {
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
import { createPageResponse, deletePage } from "@/app/redux/Axioses";

const Subpagescomp = () => {
  const [state, setState] = useState(false);
  const subpage = useSelector(fetchpageres);
  const parent = useSelector(currentPage);
  const dispatch = useDispatch();
  const handleStates = (data) => {
    dispatch(changeCurrentPage(data));
    dispatch(changeShowPageForm(false));
    dispatch(changeEditable("false"));
    dispatch(changesubpageRender("false"));
  };
  const handleDelete = (data) => {
    dispatch(deletePage({ pageid: data._id, content: data.content }));
    dispatch(changeMainPageListRender());
  };
  const handleChange =(e)=>{
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(
      createPageResponse({
        parent: parent._id,
        role: "sub",
        content: content,
        
      })
    );
  }
  return (
    <div>
      {subpage?.data?.subpages.map((value) =>
        value.title == parent._id ? (
          <li>
            { state ?
            <Box
            component="form"
            autoComplete="off"
            onSubmit={(e)=>handleChange(e)}
          >
              <TextField
              defaultValue={value.content}
          id="content"
          placeholder="Enter your username here"
          multiline
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
        ) : null
      )}
    </div>
  );
};

export default Subpagescomp;
