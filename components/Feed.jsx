"use client"

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"


const PromptCadList=({data,handelTagClick})=> {
  return (
    <div className="mt-16">
      {data.map((post)=> (
        <PromptCard 
        key={post._id}
        post={post}
        handelTagClick={handelTagClick}
      />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts,setPosts]=useState([]);

  const [searchTerm,setSearchTerm]=useState('');
  const [searchTime, setSearchTime] = useState(null);
  const [searchRes, setSearchRes] = useState([]);

  useEffect(()=> {
    const fetchPosts=async()=> {
      const response=await fetch('/api/prompt');
      const data=await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[])

  const filterPrompts=(searchText)=> {
    const regex=new RegExp(searchText,"i");
    const searchPrompts=posts.filter((item)=> 
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
    return searchPrompts;
  }

  const handleSearchChange=(e)=> {
    clearTimeout(searchTime);
    setSearchTerm(e.target.value);

    setSearchTime(
      setTimeout(()=> {
        setSearchRes(filterPrompts(searchTerm));
      },500)
    )
  }

  const handelTagClick=(tag)=> {
    setSearchTerm(tag);
    setSearchRes(filterPrompts(tag));
  }

  return (
    <section className="feed w-full ">
      <form className=" w-full ">
          <input className="search_input"
            value={searchTerm} 
            onChange={handleSearchChange}
            placeholder="searh for prompt or tag"
          />
      </form>

      {searchTerm ? (
          <PromptCadList 
          data={searchRes}
          handelTagClick={handelTagClick}
        />
      )  : (
        <PromptCadList 
        data={posts}
        handelTagClick={handelTagClick}
      />
      )}

    </section>
  )
}

export default Feed 