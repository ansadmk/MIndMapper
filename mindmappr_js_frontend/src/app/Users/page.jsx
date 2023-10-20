
import { signIn,signOut,useSession } from "next-auth/react"
import Image from "next/image"
import Welcome from "./components/welcomepage"
import Profile from "./components/profileModal"
import CreatePage from "./components/createPage"


export default function Home() {
  
  return (
    <div className="d-flex align-items-center flex-column h-100">
          <Welcome/>
          <Profile/>
          <CreatePage/>
    </div>
  )
}
