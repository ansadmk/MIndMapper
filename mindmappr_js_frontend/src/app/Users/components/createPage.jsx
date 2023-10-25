"use client"
import { createPageResponse, setprofile } from "@/app/redux/Axioses";
import { changeCurrentPage, changeEditable, changeMainPageListRender, changeShowPageForm, changemainPageListRender, currentPage, editable, fetchpageres, offset, showPageForm } from "@/app/redux/slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const CreatePage = () => {
  const subpage=useSelector(fetchpageres).subpages
  
  const edit=useSelector(editable)
  const show=useSelector(showPageForm)
  const parent=useSelector(currentPage)
  const offsetstate = useSelector(offset);
  const dispatch=useDispatch()
  const router=useRouter()
  
 const handlePage=(e)=>{
 e.preventDefault()
 console.log(e);
 const content=e.target.main.value
 dispatch(createPageResponse({parent:"main",role:"main",content:content}))
 router.push('/Users')
 dispatch(changeCurrentPage(content))
 dispatch(changeShowPageForm(false))
 dispatch(changeMainPageListRender())
 }
 
 const handleContent=(e)=>{
 e.preventDefault()
 const content=e.target.val.value
 dispatch(setprofile({pageid:parent._id,content:content}))
 dispatch(changeEditable())
 dispatch(changeMainPageListRender())
 
 }
  return (
    <div className="border-5 border w-100 h-100">
      {show ? (
        <form className={`d-flex ${offsetstate ? "justify-content-end align-items-center me-5 " : "justify-content-center align-items-center"} h-100`} onSubmit={handlePage}>
          <input type="text" placeholder="Untitled" id="main" className="border-0 fs-1 mb-5"/>
        </form>
      ) : <div className={`d-flex ${offsetstate ? "justify-content-end align-items-center me-5 " : "justify-content-center align-items-center"} h-100`}>
        {edit ? <form action="" onSubmit={handleContent}>
          <input type="text" defaultValue={parent.content} id="val" />
        </form>:<Button variant="" onClick={()=>dispatch(changeEditable())}><h2>{parent.content}</h2></Button>}
        </div>}
    </div>
  );
};

export default CreatePage;
