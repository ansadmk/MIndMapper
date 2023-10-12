
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Modal from './Modal'


const Header = () => {
  return (
    <nav className=" navbar navbar-expand-lg justify-content-center ">
    <div className="row  container justify-content-center">
      
      <Link href="/" type='button' className="navbar-brand col-10"><Image src="/icon..svg" alt="me" width="32" height="32" className='img-fluid mb-2'/>MindMappr</Link>
      <div className=" navbar-collapse col-2 " >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page">Home</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" >Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Pricing</a>
          </li> */}
          <Modal/>

        </ul>
      </div>
    </div>
  </nav>
    //
  )
}

export default Header