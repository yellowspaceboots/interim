import React from 'react'
import { BeakerIcon, Bars3Icon, Cog6ToothIcon, ArrowPathIcon } from '@heroicons/react/24/solid'

export default function Navbar2 () {
  return (
    <nav className='flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500/0 mb-3 w-screen'>
      <div className='container px-4 flex flex-wrap items-center justify-between w-full'>
        <div className='flex justify-between flex-grow'>
          <div className='flex'>
            <a className='text-sm flex leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              <Bars3Icon className='h-6 w-6 text-white hover:text-amber-600' />
            </a>
            <a className='text-sm flex font-bold leading-relaxed ml-6 mr-12 py-2 whitespace-nowrap uppercase text-white' href='#pablo'>
              <BeakerIcon className='h-6 w-6 text-amber-600' /><span className='ml-2'>Destiny</span>
            </a>
            <a className='text-sm leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              Inventory
            </a>
            <a className='text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              Progress
            </a>
            <a className='text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              Vendors
            </a>
            <a className='text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              Records
            </a>
            <a className='text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              Loadouts
            </a>
            <a className='text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              Organizer
            </a>
          </div>
          <div className='items-center flex'>
            <input className='mr-4' />
            <a className='text-sm flex leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              <ArrowPathIcon className='h-6 w-6 text-white hover:text-amber-600' />
            </a>
            <a className='text-sm flex leading-relaxed mr-4 py-2 whitespace-nowrap text-white hover:text-amber-600' href='#pablo'>
              <Cog6ToothIcon className='h-6 w-6 text-white hover:text-amber-600' />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
