"use client";
import { FetchPages, FetchSpecificPage, createPageResponse, setprofile } from "@/app/redux/Axioses";
import {
  PageState,
  Pagestate,
  SetCoverAndAvatarForPages,
  changeCurrentPage,
  changeEditable,
  changeMainPageListRender,
  changeShowPageForm,
  changeSubpageRender,
  changemainPageListRender,
  changesubpageRender,
  changeuploadcover,
  createpageres,
  currentPage,
  editable,
  fetchpageres,
  getSpecPage,
  offset,
  showPageForm,
} from "@/app/redux/slice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Subpagescomp from "./subpages";
import ImageForPages from "./Imageandcover";
import UploadpageImageModal from "./uploadpageImageModal";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const CreatePage = () => {
  
  

  const reff = useRef(null);
  const subpage = useSelector(fetchpageres);
  const subpageRender = useSelector(changeSubpageRender);
  

  const page=useSelector(getSpecPage)
  
  const state=useSelector(Pagestate)

  const edit = useSelector(editable);
  const show = useSelector(showPageForm);
  const parent = useSelector(currentPage);
  const offsetstate = useSelector(offset);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(state && parent){
      dispatch(FetchSpecificPage(parent._id))
      dispatch(PageState(false))
    }
  })
  useEffect(() => {
    function handleClickOutside(event) {
      if (reff.current && !reff.current.contains(event.target)) {
        dispatch(changeEditable());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [reff]);

  const handlePage = (e) => {
    e.preventDefault();
    
    const content = e.target.main.value;
    dispatch(
      createPageResponse({ parent: "main", role: "main", content: content })
    );

    
    dispatch(changeShowPageForm(false));
    dispatch(changeMainPageListRender("true"));
  };
  function handlenext(e) {
    e.preventDefault();
    const content = e.target.next.value;
    dispatch(
      createPageResponse({
        parent: parent._id,
        role: "sub",
        content: content,
      })
    );

    dispatch(changesubpageRender("false"));
  }

  const handleContent = (e) => {
    e.preventDefault();
    const content = e.target.val.value;
    dispatch(
      setprofile({ pageid: parent._id, content: content, prev: parent._id })
    );
    dispatch(changesubpageRender("true"));
    dispatch(changeEditable());
    dispatch(changeMainPageListRender());
    dispatch(PageState(true))
  };
  return (
    <div className=" w-100 h-100 d-flex flex-column mt-5 justify-content-center align-items-center  ">
      {show ? (
        <form
          className={`d-flex ${
            offsetstate
              ? "justify-content-end align-items-center ms-5"
              : "justify-content-center align-items-center"
          } h-100`}
          onSubmit={handlePage}
        >
          <input
            type="text"
            placeholder="Untitled"
            id="main"
            className="border-0 fs-1 mb-5"
          />
        </form>
      ) : (
        <div
          className={` gap-5 w-100  flex-column  h-100`}
        >
          <ImageForPages />
          
          {subpageRender ? (
            <form onSubmit={handlenext}>
              <input type="text" id="next" ref={reff} />
            </form>
          ) : null}
          <ul>
            {/* {subpage?.data?.subpages.map((value) => (
              <Subpagescomp value={value}  />
            ))} */}
            
          
              
            
          </ul>
        </div>
      )}
      {edit ? (
            <form action="" onSubmit={handleContent}>
              <input
                type="text"
                defaultValue={page?.data?.content}
                id="val"
                ref={reff}
              />
            </form>
          ) : (
           
          <Button
              variant=""
              onClick={() => {
                dispatch(changeEditable("true"));

              }}
              style={{zIndex:"10"}}
              className="mt-5"
            >
              <h2>{page?.data?.content}</h2>
            </Button>
          
           
          )}

          <Subpagescomp />
    <UploadpageImageModal/>
    </div>
  );
};

export default CreatePage;
