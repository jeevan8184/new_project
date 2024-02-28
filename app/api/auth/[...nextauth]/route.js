
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";

import newUser from "@models/user";

const handler=NextAuth({

    providers:[
        GoogleProvider ({
            clientId:process.env.GOOGLE_CLIENTID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session}) {
            
            const sessionUser=await newUser.findOne({
                email:session.user.email
            })
            session.user.id=sessionUser._id.toString();
            return session;
        },
        async signIn({profile}) {
            
            try {
                await connectToDB();
                const user=await newUser.findOne({email:profile.email});
                
                if(!user) {
    
                    await newUser.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }
    
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export {handler as GET,handler as POST};