
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET posts

export const GET=async(request,{params})=> {

    try {
        await connectToDB();
        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response('prompt not found',{status:404});
        
        return new Response(JSON.stringify(prompt),{status:200});

    } catch (error) {
        return new Response('failed to ftech prompt',{status:500});
    }
}

//PATCH posts

export const PATCH=async(request,{params})=> {
    const {prompt,tag}=await request.json();

    try {
        await connectToDB();
        const existPrompt=await Prompt.findById(params.id);
        if(!existPrompt) return new Response('prompt not found ',{status:404});
        existPrompt.prompt=prompt;
        existPrompt.tag=tag;

        await existPrompt.save();
        
        return new Response(JSON.stringify(existPrompt),{status:200});
    } catch (error) {
        return new Response('failed to patch update',{status:500});
    }
}

//DELETE post

export const DELETE=async(request,{params})=> {

    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response('Prompt deleted',{status:200});
    } catch (error) {
        return new Response('failed to delete prompt',{status:500});
    }
}