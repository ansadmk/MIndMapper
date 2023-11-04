
import { Inter } from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.css'
import AdminPanel from './components/adminPanel'
import StoreProvider from '../redux/StoreProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mindmapper',
  description: 'A notion clone',
}

export default function RootLayout({
  children,
}) {
  return (
    <StoreProvider>
    <html lang="en">
      
      <body className={inter.className}>
      <AdminPanel/>
        {children}
        
        </body>
    </html>
    </StoreProvider>
  )
}
