
import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async()=> {
    mongoose.set('strictQuery',true)
    if(isConnected) return console.log('mongodb is already connected');

    try {
        console.log('connection',"mongodb+srv://Prompt:Prompt@atlascluster.p0rj0jx.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
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
