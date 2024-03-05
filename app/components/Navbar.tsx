import Link from 'next/link'
import React from 'react'
import LogoutBtn from './LogoutBtn'

const Navbar = () => {
  return (
    <div className='bg-slate-800 justify-center flex'>
      <ul className='p-3 gap-4 flex justify-around'>
        <Link href="/">Home</Link>
        <Link href="/user">User</Link>
        <Link href="/manager">Manager</Link>
        <Link href="/admin">Admin</Link>
        <LogoutBtn/>
      </ul>
    </div>
  )
}

export default Navbar