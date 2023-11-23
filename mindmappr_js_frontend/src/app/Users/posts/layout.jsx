
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'


import StoreProvider from '../../redux/StoreProvider'
import ResponsiveAppBar from './components/navbar'
import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import Loading from './loading'
const Element=0


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
      
      
      <ResponsiveAppBar/><Suspense fallback={<Loading/>}> 
      {children}</Suspense> 
     
       
        </body>
    </html>
    </StoreProvider>
  )
}
