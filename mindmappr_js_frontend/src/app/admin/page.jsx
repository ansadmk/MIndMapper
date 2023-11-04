import Image from "next/image"
import usersList from "./components/usersList"


export default function Home() {
  return (
    <div className="d-flex flex-column">
    <usersList/>
    </div>
  )
}
