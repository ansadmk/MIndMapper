import { signIn,signOut,useSession } from "next-auth/react"
import Image from "next/image"


export default function Home() {
  const {data}=useSession()
  return (
    <div className="d-flex flex-column">
          hello {data.user.name}
    </div>
  )
}
