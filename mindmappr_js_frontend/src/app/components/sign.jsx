'use client'
import { signIn} from "next-auth/react"

import React from 'react'
import { Button } from "react-bootstrap"

const sign = () => {
    
  return (
    <div className="d-flex flex-column gap-2">
    <Button onClick={()=>signIn('google',{ callbackUrl: 'http://localhost:3000/Users'})}>Google</Button>
    <Button onClick={()=>signIn('github',{ callbackUrl: 'http://localhost:3000/Users'})}>Github</Button>
    </div>
  )
}

export default sign
