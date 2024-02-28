"use client"

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const PromptProfile = ({params}) => {
    const searchParams=useSearchParams();
    const name=searchParams.get('name')

    const [posts,setPosts]=useState([]);
  
    useEffect(()=> {
      const fetchPosts=async()=> {
        const response=await fetch(`/api/users/${params?.id}/posts`);
        const data=await response.json();
        setPosts(data);
      }
      if(params?.id) fetchPosts();
    },[params?.id])

  return (
    <Profile 
    name={name}
    desc="Welcome to your personalized profile page"
    data={posts}
  />
  )
}

export default PromptProfile