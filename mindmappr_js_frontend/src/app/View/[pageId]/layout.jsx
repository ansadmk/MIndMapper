"use client "
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'

import { getServerSession } from 'next-auth'
import StoreProvider from '../../redux/StoreProvider'
import Navbar from './Navbar'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mindmapper',
  description: 'A notion clone',
}

export default async function RootLayout({
  children,
}) {
  const session= await getServerSession()
  
  
  return (
    <StoreProvider>
    <html lang="en">
      
      <body className={inter.className} >
      <Navbar/>
     {children}
     
       
        </body>
    </html>
    </StoreProvider>
  )
}
