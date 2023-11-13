"use client";
import { deletePage, setPublic } from "@/app/redux/Axioses";
import {
  Breadcrumb,
  changeBreadCrumb,
  changeCurrentPage,
  changeMainPageListRender,
  currentPage,
} from "@/app/redux/slice";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const NavBar = () => {
  const dispatch = useDispatch();
  const page = useSelector(currentPage);
  const crumb = useSelector(Breadcrumb);

  
  const handleCrumb = (d, index) => {
    dispatch(changeCurrentPage(d));
    dispatch(changeBreadCrumb({ type: "select", data: index }));
  };
  const handlePublic=()=>{
    dispatch(setPublic({id:page.ansester}))
  }
  const handleUnPublic=()=>{
    dispatch(setPublic({id:page.ansester,unpub:true}))
  }
  return (
    <div className="d-flex justify-content-start w-100 ">
      <div className="me-5 d-flex justify-content-start w-100">
        <div className="d-flex">
          {crumb?.map((data, index) => (
            <Button
              variant=""
              onClick={() => handleCrumb(data.content, index)}
              className="nav-link"
            >
              {data?.content?.content} /
            </Button>
          ))}

        </div>
        
      </div>
      
      <div>

      </div>
    </div>
  );
};

export default NavBar;
