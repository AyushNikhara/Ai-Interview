'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
  const path = usePathname();
  console.log(path);

  return (
    <div className='flex p-4 items-center  justify-between bg-secondary shadow-sm' >
      <Image src={'/logo.svg'} width={100} height={60} alt='' />
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path == `/dashboard` && 'text-primary font-bold'}
        `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path == `/dashboard/upgrade` && 'text-primary font-bold'}
        `}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path == `/dashboard/how` && 'text-primary font-bold'}
        `}>How it works</li>
        <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
        ${path == `/dashboard/about` && 'text-primary font-bold'}
        `}>About</li>
      </ul>


      <UserButton />

    </div>
  )
}

export default Header