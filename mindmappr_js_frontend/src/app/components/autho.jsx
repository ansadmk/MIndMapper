"use client"
import { getCookie } from 'cookies-next';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const autho = () => {
    const router=useRouter()
    const cookie=getCookie('token')
    useEffect(()=>cookie?null:router.push('/'),[])
  return (
    <></>
  )
}

export default autho