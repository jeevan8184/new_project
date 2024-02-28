import React from 'react';
import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className='w-full flex flex-col '>
        <div className='flex flex-col text-center flex-center'>
          <h1 className=' text-5xl sm:text-6xl font-extrabold flex-center'>Discover & share</h1>
          <br className=' max-md:hidden' />
          <div className='text-center text-5xl bg-clip-text font-extrabold text-orange-600'>AI Powered prompts</div>
          <p className='gap-1 max-w-2xl text-lg sm:text-xl text-gray-600 py-6 flex-center text-center'>
            Promptopia is an open source  AI prompting tool for modern world to discover,create and share your prompts
        </p>
        </div>
        <Feed />
    </section>
  )
}

export default Home