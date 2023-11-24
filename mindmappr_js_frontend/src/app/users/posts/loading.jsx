import Image from "next/image";

export default function Loading() {
    
    return <div className="d-flex justify-content-center align-items-center h-100" ><Image src='/postsloading.gif' alt='' width={512} height={512}/> </div>
  }