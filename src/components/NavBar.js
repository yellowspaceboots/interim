import React from 'react'
import Link from 'next/link'
import { Bars3Icon, Cog6ToothIcon, ArrowPathIcon, MagnifyingGlassIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import SignInButton from '@/app/SignInButtonTest'

export default async function Navbar () {
  const session = await getServerSession(authOptions)
  return (
    <header className='sticky top-0 z-50'>
      <div className='relative'>
        <nav className='fixed flex px-6 py-3 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 mb-3 w-screen'>
          <a className='text-sm flex leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
            <Bars3Icon className='h-6 w-6 text-white hover:text-amber-600' />
          </a>
          <Link className='text-sm flex font-bold leading-relaxed ml-6 mr-4 py-2 whitespace-nowrap uppercase text-white' href='/'>
            <PuzzlePieceIcon className='h-6 w-6 text-amber-600' /><span className='ml-2'>Destiny</span>
          </Link>
          <div className='flex-grow flex items-center'>
            <div className='mx-4 lg:flex hidden'>
              <Link className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='/inventory'>Inventory</Link>
              <Link className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='/progress'>Progress</Link>
              <Link className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='/vendors'>Vendors</Link>
              <Link className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='/records'>Records</Link>
              <Link className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='/loadouts'>Loadouts</Link>
              <Link className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='/organizer'>Organizer</Link>
            </div>
            <input className='text-gray-400 text-sm mr-4 w-full hidden sm:flex outline-none rounded-sm px-2 h-8 bg-black/40' placeholder='search item/perk, is:dupe, is:maxpower, -is:blue, and more' />
          </div>
          <div className='flex items-center'>
            <a className='text-sm flex leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              <ArrowPathIcon className='h-6 w-6 text-white hover:text-amber-600' />
            </a>
            <a className='text-sm sm:flex hidden leading-relaxed py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              <Cog6ToothIcon className='h-6 w-6 text-white hover:text-amber-600' />
            </a>
            <a className='text-sm flex sm:hidden leading-relaxed py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              <MagnifyingGlassIcon className='h-6 w-6 text-white hover:text-amber-600' />
            </a>
            <SignInButton session={session} />
          </div>
        </nav>
      </div>
    </header>
  )
}
