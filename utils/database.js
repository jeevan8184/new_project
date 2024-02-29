
import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async()=> {
    mongoose.set('strictQuery',true)
    if(isConnected) return console.log('mongodb is already connected');

    try {
        console.log('connection',process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'share_prompt',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log('mongodb connected and its working')
    } catch (error) {
        console.log(error);
    }
}
