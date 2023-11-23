

import Image from "next/image"
import Welcome from "./components/welcomepage"
import Profile from "./components/profileModal"
import MiniDrawer from "./components/sideBar"



export default function Home() {
  
  return (
    <div>
         
    <MiniDrawer/>

    </div>
    // <div className="d-flex align-items-center flex-column h-100">
    //       <Welcome/>
    //       <Profile/>
          
    // </div>
    
  )
}
