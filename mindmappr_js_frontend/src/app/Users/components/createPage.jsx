"use client"
import { showPageForm } from "@/app/redux/slice";
import { useSelector } from "react-redux";
const createPage = () => {
  const show=useSelector(showPageForm)
  
  return (
    <div className="border-5 border w-100 h-100">
      {show ? (
        <form className="d-flex justify-content-center align-items-center h-100" onSubmit={handlePage}>
          <input type="text" placeholder="Untitled" className="border-0 fs-1 mb-5"/>
        </form>
      ) : null}
    </div>
  );
};

export default createPage;
