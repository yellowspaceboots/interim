'use client'

import { signIn, signOut } from 'next-auth/react'

export default function SignInButton ({ session }) {
  return (
    <>
      {session
        ? (
          <img
            onClick={() => signOut()}
            src={session.user.image}
            className='brightness-75 hover:brightness-100 h-7 w-7 ml-4 rounded-full cursor-pointer'
            alt='Picture of the author'
          />
          )
        : <button onClick={() => signIn('bungie')} className='bg-white/0 text-white hover:text-amber-600 ml-4'>My Account</button>}
    </>

  )
}
