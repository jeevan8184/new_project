
import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async()=> {
    mongoose.set('strictQuery',true)
    if(isConnected) return console.log('mongodb is already connected');

    try {
        await mongoose.connect(process.env.MONGODB_URL.toString(),{
            dbName:'share_prompt',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log('mongodb connected')
    } catch (error) {
        console.log(error);
    }
}
