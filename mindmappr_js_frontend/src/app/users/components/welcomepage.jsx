'use client'
import { signIn,signOut,useSession } from "next-auth/react"
import { Button } from "react-bootstrap"
import NavBar from "./NavBar"



export default function Welcome() {
  const {data}=useSession()
 
  return (
    <div className="position-relative ">
      <NavBar />
        
    </div>
  )
}
