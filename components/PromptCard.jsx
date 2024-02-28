"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const PromptCard = ({post,handelTagClick,handleEdit,handleDelete}) => {
  const [copy, setCopy] = useState('');

  const {data:session}=useSession();
  const pathname=usePathname();
  const router=useRouter();

  const handleProfileClick=()=> {
    if(session?.user.id===post.creator._id) {
      router.push('/profile')
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }
  }

  const handleCopy=()=> {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopy(""),2000)
  }
  

  return (
    <div className="prompt_card mb-4 w-full ">
      <div className="flex justify-between gap-5 items-start">
         <div className=" flex-1 flex justify-start gap-3 cursor-pointer" onClick={handleProfileClick}>
           <Image 
              src={post?.creator.image}
              alt="user image"
              height={40}
              width={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className=" text-gray-900 font-satoshi font-semibold">{post.creator.username}</h3>
              <p className=" text-gray-500 text-sm font-inter ">{post.creator.email}</p>
            </div>
         </div>
         <div className="bg-white w-7 h-7 flex-center rounded-full cursor-pointer" onClick={handleCopy}>
           <Image src={
              copy ===post.prompt ? "/assets/icons/tick.svg" : '/assets/icons/copy.svg' 
              }
              width={15}
              height={15}
            />
         </div>
      </div>
      
      <p className=" text-gray-900 text-sm py-1 pb-2">{post.prompt}</p>
      <p className=" font-inter text-blue-500 cursor-pointer" onClick={()=>handelTagClick && handelTagClick(post.tag)}>#{post?.tag}</p>
      
      {session?.user.id===post.creator._id && pathname==='/profile' && (
         <div className="flex gap-4 items-center flex-end ">
           <p className=" font-semibold text-yellow-400 cursor-pointer" onClick={handleEdit}>Edit</p>
           <p className=" font-semibold text-red-500 cursor-pointer" onClick={handleDelete}>Delete</p>
         </div>
      )}
    </div>
  )
}

export default PromptCard