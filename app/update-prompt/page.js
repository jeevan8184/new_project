"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect,useState,Suspense } from "react"

const UpdatingPrompt = () => {
    const {data:session}=useSession();

    const router=useRouter();
    const searchParams=useSearchParams();
    const promptId=searchParams.get('id');

    const [submitting,setSubmitting]=useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })

    useEffect(()=> {
        const getPromptDetails=async()=> {
            const response=await fetch(`/api/prompt/${promptId}`);
            const data=await response.json();
            console.log(data);
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(promptId) getPromptDetails();

    },[promptId])



    const updatePrompt=async(e)=> {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) alert('promt Id not found')

        try {

            const response=await fetch(`/api/prompt/${promptId}` , {
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            }) 

            if(response.ok) {
                router.push('/');
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Form 
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

const EditPrompt = () => {
    return <Suspense>
        <UpdatingPrompt />
    </Suspense>
}

export default EditPrompt;

