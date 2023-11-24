
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import SessionProvider from "./components/sessionProvider"
import { getServerSession } from 'next-auth'
import StoreProvider from '../redux/StoreProvider'
import { Suspense } from 'react'
import Loading from './loading'
import Profile from "./components/profileModal"

const Element=0

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
       
      <Suspense fallback={<Loading/>}> <SessionProvider session={session}>{children}</SessionProvider></Suspense>
     
      <Profile/>
        </body>
    </html>
    </StoreProvider>
  )
}
