"use client"

import Form from "@components/Form";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react"

const CreatePrompt = () => {
    const {data:session}=useSession();
    const router=useRouter();
    

    const [submitting,setSubmitting]=useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })
    const createprompt=async(e)=> {
        e.preventDefault();
        setSubmitting(true);

        try {

            const response=await fetch('/api/prompt/new' , {
                method:'POST',
                body:JSON.stringify({
                    userId:session?.user.id,
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
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createprompt}
    />
  )
}

export default CreatePrompt