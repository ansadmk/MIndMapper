
import { Inter } from 'next/font/google'
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mindmapper',
  description: 'A notion clone',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      
        {children}
        
        </body>
    </html>
  )
}
