"use client";
import {
  FetchPages,
  FetchSpecificPage,
  createPageResponse,
  setprofile,
} from "@/app/redux/Axioses";
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

import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
Subpagescomp;
import ImageForPages from "./Imageandcover";
import UploadpageImageModal from "./uploadpageImageModal";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SubpagescomP from "./pageCreator";
import Subpagescomp from "./subpages";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const CreatePage = () => {
  const reff = useRef(null);
  const subpage = useSelector(fetchpageres);
  const subpageRender = useSelector(changeSubpageRender);

  const page = useSelector(getSpecPage);

  const state = useSelector(Pagestate);

  const edit = useSelector(editable);
  const show = useSelector(showPageForm);
  const parent = useSelector(currentPage);
  const offsetstate = useSelector(offset);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state && parent) {
      dispatch(FetchSpecificPage(parent._id));
      dispatch(PageState(false));
    }
  });
  useEffect(() => {
    dispatch(FetchSpecificPage(parent?._id));
    dispatch(PageState(false));
  }, [dispatch]);
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
   
    if (parent.public) {
      dispatch(
        createPageResponse({
          parent: parent._id,
          role: "sub",
          content: content,
          public1: "true",
        })
      );
    } else {
      dispatch(
        createPageResponse({
          parent: parent._id,
          role: "sub",
          content: content,
        })
      );
    }

    dispatch(changesubpageRender("false"));
  }

  const handleContent = (e) => {
    e.preventDefault();
    const content = e.target.val.value;

    dispatch(
      setprofile({ pageid: parent._id, content: content, prev: parent._id })
    );

    dispatch(changeEditable());
    dispatch(changeMainPageListRender());
    dispatch(PageState(true));
  };
  
  return (
    <div className="">
         <Container maxWidth="lg" >
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
        <div className="row flex-column">
          <div
            className={` col-6  w-100 d-flex justify-content-center   h-100`}
          >
            {parent ? <ImageForPages /> : null}
          </div>
          <div className="d-flex flex-column justify-content-start">
            {edit ? (
              <form
                action=""
                onSubmit={handleContent}
                className="d-flex justify-content-center"
              >
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
                
                className="w-25"
              >
                <h2>{page?.data?.content}</h2>
              </Button>
            )}
            {parent ? (
              <div className="container m-auto d-flex justify-content-start w-25">
              <IconButton
                className=" "
                onClick={() => dispatch(changesubpageRender("true"))}
              >
                <NoteAddIcon />
              </IconButton>
              </div>
            ) : null}

              {show ? null : (
            <ul className="d-flex flex-column align-items-start  justify-content-start   ">
                
                
                <Subpagescomp subpageRender={subpageRender} subpage={subpage} handlenext={handlenext} />
            </ul>
              )}

            <UploadpageImageModal />
          </div>
        </div>
      )}
      </Container>
    </div>
  );
};

export default CreatePage;
