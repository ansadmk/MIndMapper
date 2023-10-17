
import { signIn,signOut,useSession } from "next-auth/react"
import Image from "next/image"
import Welcome from "./components/welcomepage"


export default function Home() {
  
  return (
    <div className="d-flex align-items-center flex-column">
          <Welcome/>
    </div>
  )
}