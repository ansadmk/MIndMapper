'use client'
import { cloudinary } from "@/app/redux/Axioses"
import { cloudResponse } from "@/app/redux/slice"
import { useDispatch, useSelector } from "react-redux"

export function Uploads(file){
     const dispatch =useDispatch()
     const res=useSelector(cloudResponse)
     dispatch(cloudinary(file))
     return res
}
