"use client"
import { createPageResponse } from "@/app/redux/Axioses";
import { showPageForm } from "@/app/redux/slice";
import { useDispatch, useSelector } from "react-redux";

const CreatePage = () => {
  const show=useSelector(showPageForm)
  const dispatch=useDispatch()
 const handlePage=(e)=>{
 e.preventDefault()
 console.log(e);
 const content=e.target.main.value
 dispatch(createPageResponse({parent:"main",role:"main",content:content}))
 }
  return (
    <div className="border-5 border w-100 h-100">
      {show ? (
        <form className="d-flex justify-content-center align-items-center h-100" onSubmit={handlePage}>
          <input type="text" placeholder="Untitled" id="main" className="border-0 fs-1 mb-5"/>
        </form>
      ) : null}
    </div>
  );
};

export default CreatePage;
