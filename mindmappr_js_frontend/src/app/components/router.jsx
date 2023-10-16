"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const router = ({path}) => {
    const routers=useRouter()
 useEffect(function() {
    routers.push(path)
  },[])
}
export default router

