import Image from "next/image"
import UsersList from "./components/usersList"


export default function Home() {

  return (
    <div className="d-flex flex-column h-100">
    <UsersList/>
    </div>
  )
}
