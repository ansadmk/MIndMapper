"use client";
import { createPageResponse, setprofile } from "@/app/redux/Axioses";
import {
  changeCurrentPage,
  changeEditable,
  changeMainPageListRender,
  changeShowPageForm,
  changeSubpageRender,
  changemainPageListRender,
  changesubpageRender,
  currentPage,
  editable,
  fetchpageres,
  offset,
  showPageForm,
} from "@/app/redux/slice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Subpagescomp from "./subpages";

const CreatePage = () => {
  const reff = useRef(null);
  const subpage = useSelector(fetchpageres);
  const subpageRender =useSelector(changeSubpageRender)
  console.log(subpage?.data?.subpages);
  const [state, setState] = useState(false);
  
  const edit = useSelector(editable);
  const show = useSelector(showPageForm);
  const parent = useSelector(currentPage);
  const offsetstate = useSelector(offset);
  const dispatch = useDispatch();
  const router = useRouter();
  
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
    console.log(e);
    const content = e.target.main.value;
    dispatch(
      createPageResponse({ parent: "main", role: "main", content: content })
    );
    
    dispatch(changeCurrentPage(content));
    dispatch(changeShowPageForm(false));
    dispatch(changeMainPageListRender());
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

   dispatch(changesubpageRender("false")) ;
  }

  const handleContent = (e) => {
    e.preventDefault();
    const content = e.target.val.value;
    dispatch(setprofile({ pageid: parent._id, content: content ,prev:parent.content}));
    dispatch(changesubpageRender("true")) ;
   
    dispatch(changeEditable());
    dispatch(changeMainPageListRender());
    
  };
  return (
    <div className="border-5 border w-100 h-100">
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
          className={`d-flex flex-column ${
            offsetstate
              ? "justify-content-center align-items-center me-5 "
              : "justify-content-center align-items-center"
          } h-100`}
        >
          {edit ? (
            <form action="" onSubmit={handleContent}>
              <input
                type="text"
                defaultValue={parent.content}
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
            >
              <h2>{parent.content}</h2>
            </Button>
          )}
          {subpageRender ? (
            <form onSubmit={handlenext}>
              <input type="text" id="next" ref={reff}/>
            </form>
          ) : null}
          <ul>
            
              <Subpagescomp/>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreatePage;
