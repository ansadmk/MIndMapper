
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'

import StoreProvider from '../redux/StoreProvider'
import { Suspense } from 'react'
import Loading from './loading'
import Profile from "./components/profileModal"



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mindmapper',
  description: 'A notion clone',
}

export default async function RootLayout({
  children,
}) {

 
  
  return (
    <StoreProvider>
    <html lang="en">
      
      <body className={inter.className} >
       
      <Suspense fallback={<Loading/>}> {children}</Suspense>
     
      <Profile/>
        </body>
    </html>
    </StoreProvider>
  )
}
