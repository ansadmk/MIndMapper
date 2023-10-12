import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from '../components/Footer'
import Navbar from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mindmapper',
  description: 'A notion clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
