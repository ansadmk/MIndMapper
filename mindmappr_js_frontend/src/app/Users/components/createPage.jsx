"use client"
import { createPageResponse } from "@/app/redux/Axioses";
import { changeMainPageListRender, changeShowPageForm, currentPage, fetchpageres, offset, showPageForm } from "@/app/redux/slice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CreatePage = () => {
  const subpage=useSelector(fetchpageres).subpages
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
 dispatch(changeShowPageForm())
 dispatch(changeMainPageListRender())
 }
  return (
    <div className="border-5 border w-100 h-100">
      {show ? (
        <form className={`d-flex ${offsetstate ? "justify-content-end align-items-center me-5 " : "justify-content-center align-items-center"} h-100`} onSubmit={handlePage}>
          <input type="text" placeholder="Untitled" id="main" className="border-0 fs-1 mb-5"/>
        </form>
      ) : <div className={`d-flex ${offsetstate ? "justify-content-end align-items-center me-5 " : "justify-content-center align-items-center"}`}>
        <h2>{parent}</h2>
        </div>}
    </div>
  );
};

export default CreatePage;
