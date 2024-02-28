
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST=async(request)=> {
    const {userId,prompt,tag}=await request.json();
    console.log('connection')
    try {
        await connectToDB();
        console.log('connected')
        const newPrompt= new Prompt({creator:userId,prompt,tag});
        await newPrompt.save();
    
        return new Response(JSON.stringify(newPrompt),{status:201})

    } catch (error) {
        return new Response('Failed to create new prompt : ',{status:500});
    }
}