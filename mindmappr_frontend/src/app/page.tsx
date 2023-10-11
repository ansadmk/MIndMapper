import Image from "next/image"


export default function Home() {
  return (
    <div className="d-flex flex-column">
    <Image src="/frontpage.svg" alt="me" width="1024" height="720" className="container m-auto img-fluid"/>
    </div>
  )
}
