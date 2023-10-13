
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions={
    providers:[
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENTID ,
                clientSecret: process.env.GOOGLE_SECRETID
            }
        ),
        Github({
            clientId: process.env.GITHUB_CLIENTID,
            clientSecret: process.env.GITHUB_SECRETID 
        })
    ],
    
    
}
export const handler=NextAuth(authOptions);
export {handler as GET,handler as POST};