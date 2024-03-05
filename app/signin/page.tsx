"use client"
import React, { unstable_useCacheRefresh, useRef } from 'react'
import { signIn } from 'next-auth/react'

const Signin = () => {

  const data = useRef({username: "",password: ""})

  function signInAct(e: any){
    e.preventDefault()
    signIn("credentials", {
      username: data.current.username,
      password: data.current.password,
      redirect: true,
        callbackUrl: "/",
    })
  }

  function githubLogin(e:any){
    e.preventDefault();
    signIn("github", {
      redirect: true,
      callbackUrl: '/'
    })
  }

  return (
    <div className='w-full flex justify-center items-center mt-5'>
      <div className='border border-sky-900 p-5 rounded-md'>
        <form className='flex flex-col'>
          <input
            name='username'
            type="text" 
            onChange={(e) => data.current.username = e.target.value}
            placeholder='Enter Username'
            className='bg-black border border-sky-700 max-w-80 min-w-52 focus:outline-none my-2 px-3 py-2'
          />
          <input
            name='password'
            type="password"
            onChange={(e) => data.current.password = e.target.value}
            placeholder='Enter Password'
            className='bg-black border border-sky-700 max-w-80 min-w-52 focus:outline-none my-2 px-3 py-2'
            />
          <button onClick={(e) => signInAct(e)} className='bg-sky-900 text-gray-300 p-2 rounded-sm mt-2'>SignIn</button>
        </form>
        <form className='flex flex-col'>
          <button onClick={(e) => githubLogin(e)} className='bg-sky-900 text-gray-300 p-2 rounded-sm mt-2'>GitHub</button>
        </form>
      </div>
    </div>
  )
}

export default Signin