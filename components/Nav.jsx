"use client"

import React from 'react'
import { signIn,signOut,useSession,getProviders } from 'next-auth/react'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'


const Nav = () => {
  const {data:session}=useSession();

  const [providers,setProviders]=useState(null);
  const [toggleDrop,setToggleDrop]=useState(false); 

  useEffect(()=> {
    const setUpProviders=async()=> {
      const response=await getProviders();
      setProviders(response);
    }
    setUpProviders();
  },[])

  return (
    <nav className=' flex-between mb-16 pt-3'>
      <Link href="/" className='flex gap-3'>
        <Image src='/assets/images/logo.svg' 
            height={30}
            width={30}
            alt='icon image'
          />
          <p className='logo-text'>Promptopia</p>
      </Link>
      {/* desktop navigation */}
      <div className='max-sm:hidden'>
        {session?.user ? (
          <div className='gap-3 md:gap-5 flex'>
            <Link href='/create-prompt' 
              className=' py-2 px-4 bg-black text-white rounded-full'
            >
              Create Post
            </Link>
            <button className='black_btn' onClick={signOut} >signout</button>
            <Link href='/profile'>
              <Image src={session?.user.image}
                height={37} width={37}
                alt='profile'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
           {providers && Object.values(providers).map((provider)=> (
            <button type='button' className='black_btn'
                onClick={()=>signIn(provider.id)}
                key={provider.name}
            >
              Sign In
            </button>
           ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className='sm:hidden flex relative '>
        {session?.user ? (
          <div className='flex'>
            <Image src={session?.user.image}
                height={37} width={37}
                className='rounded-full'
                alt='profile'
                onClick={()=>setToggleDrop((prev)=> !prev)}
              />
              {toggleDrop && (
                <div className='dropdown'>
                  <Link href='/profile'
                    onClick={()=>setToggleDrop(false)}
                    className='dropdown_link' 
                  >
                    My profile
                  </Link>
                    <Link href='/create-prompt' 
                      className=' py-2 px-4 bg-black text-white rounded-full'
                    >
                      Create Post
                    </Link>
                    <button type='button' onClick={()=> {
                      setToggleDrop(false)
                      signOut();
                      }}
                      className='black_btn'
                    >signout</button>
                </div>
              )}
          </div>
        ): (
          <>
           {providers && Object.values(providers).map((provider)=> (
            <button type='button' className='black_btn'
                onClick={()=>signIn(provider.id)}
                key={provider.name}
            >
              Sign In
            </button>
           ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav