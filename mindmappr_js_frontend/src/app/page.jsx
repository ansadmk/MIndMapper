import Image from "next/image"
import Header from "./components/Header"
import Pen from './components/pen.gif'


export default function Home() {
  return (
    <>
    <Header/>
    <div className="d-flex flex-column">
      
    <Image src="/frontpage.svg" alt="me" width="1024" height="720" className="container m-auto img-fluid"/>
    </div>
    </>
  )
}
