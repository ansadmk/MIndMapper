import { Inter } from "next/font/google";
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.css";
import SessionProvider from "./Users/components/sessionProvider"
import { getServerSession } from 'next-auth'
import StoreProvider from "./redux/StoreProvider";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mindmapper",
  description: "A notion clone",
};

export default async function RootLayout({ children }) {
  const session= await getServerSession()
 
  return (
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>
        
      <SessionProvider session={session}>
        <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
        </SessionProvider>
        
      </body>
    </html>
    </StoreProvider>
  );
}
