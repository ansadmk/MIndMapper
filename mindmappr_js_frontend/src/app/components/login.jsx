
import React from 'react'
import { Form ,Button} from 'react-bootstrap'
import { signIn,signOut,useSession } from "next-auth/react"
import Sign from './sign'

const login = () => {
  return (
    <Form.Group className='p-5 d-flex flex-column gap-2' >
        <Form.Control type="text" placeholder="username" id="username" className='mb-2' />
        <Form.Control type="password" placeholder='password' id='password' />
       <Button variant='secondary' className='w-100 m-auto mt-4'>Continue</Button>
      <Sign/>
      

    </Form.Group>
  )
}

export default login