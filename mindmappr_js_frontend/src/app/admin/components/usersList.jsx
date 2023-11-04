"use client"
import { getUsersList } from '@/app/redux/Admin/AdminAxioses'
import { getUsersForAdmin } from '@/app/redux/Admin/adminSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const usersList = () => {
  const dispatch=useDispatch()
  const users=useSelector(getUsersForAdmin)
  useEffect(()=>{
    dispatch(getUsersList())
  },[])
  return (
    <div>{users?.data?.map(value=>value.username)}</div>
  )
}

export default usersList