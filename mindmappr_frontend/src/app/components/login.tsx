import React from 'react'
import { Form ,Button} from 'react-bootstrap'

const login = () => {
  return (
    <Form.Group >
        <Form.Control type="text" placeholder="username" id="username" className='mb-2' />
        <Form.Control type="password" placeholder='password' id='password' />
       <Button variant='secondary' className='w-100 m-auto mt-4'>Continue</Button>
    </Form.Group>
  )
}

export default login