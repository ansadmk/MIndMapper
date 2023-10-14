'use client'
import { signIn,signOut,useSession } from "next-auth/react"
import { Button } from "react-bootstrap"



export default function Welcome() {
  const {data}=useSession()
 
  return (
    <div className="d-flex flex-column">
        <img src={data?.user?.image} alt="" />
          hello {data?.user?.name}
          <Button onClick={()=>signOut()}>signout</Button>
    </div>
  )
}
