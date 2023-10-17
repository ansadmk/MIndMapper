"use client "
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import SessionProvider from "../Users/components/sessionProvider"
import { getServerSession } from 'next-auth'
import SideBar from './components/SideBar'
import {Provider} from "react-redux"
import { store } from '../redux/store'


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
    <html lang="en">
      
      <body className={inter.className}>
       <Provider store={store}>
      <SideBar/>
      <SessionProvider session={session}>{children}</SessionProvider>
      </Provider>
       
        </body>
    </html>
  )
}
