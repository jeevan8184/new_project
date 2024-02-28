import Link from 'next/link'
import React from 'react'

const Form = ({type , post , setPost , submitting , handleSubmit}) => {

  return (
    <div className=' relative flex justify-center items-center'>
    <section className='w-full flex-col flex-start md:ml-32 max-w-screen-lg'>
        <h1 className=' text-4xl font-extrabold text-blue-500 text-left mt-5'>{type} post</h1>
        <p className='text-left mt-2 max-w-md text-gray-800'>create and share your own prompts with new AI powered systems... 
          and explore the world and its interesting.. pls share and subscribe
        </p>

        <form onSubmit={handleSubmit} className='mt-6 w-full max-w-xl '>
           <label>
             <span className=' font-semibold text-lg flex-start py-4'>Your API prompt</span>
             <textarea className='w-full' rows={6}
                required
                placeholder='Create your prompt'
                value={post.prompt} onChange={(e)=> setPost({...post,prompt:e.target.value})}
             />
           </label>
           <label>
             <span className=' font-semibold text-lg flex-start py-4 text-gray-700'>Tag (#webdeveloper,#coder,#dancer) </span>
             <input className='w-full py-3 bg-white'
                placeholder='tags '
                required
                value={post.tag} onChange={(e)=> setPost({...post,tag:e.target.value})}
             />
           </label>

           <div className='flex-end gap-4 mx-3 mb-5'>
            <Link href='/' className='rounded-full bg-gray-200 px-5 py-1.5 my-4'>
               cancel
            </Link>
            <button type='submit' className='px-5 py-1.5 text-white bg-orange-500 rounded-full' 
                disabled={submitting}
            >
              {submitting ? `${type}...`:type}
            </button>
           </div>
        </form>

    </section>
    </div>
  )
}

export default Form