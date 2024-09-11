'use client'

import { BuiltInProviderType } from 'next-auth/providers/index'
import { signOut, getProviders, LiteralUnion, ClientSafeProvider, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
        const response = await getProviders();
        setProviders(response);
    }

    fetchProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image src='/assets/images/logo.svg' alt='' width={30} height={30} className='object-contain' />
            <p className="log_text">Prompt Share</p>
        </Link>

        <div className="sm:flex hidden">
            {isLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href='/create-prompt' className='black_btn'>Create Prompt</Link>
                    <button type="button" onClick={() => signOut()} className='outline_btn'>Sign Out</button>
                    <Link href='/profile'>
                        <Image src='/assets/images/logo.svg' alt='' width={37} height={37} className='rounded-full' />
                    </Link>
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button type='button' className='outline_btn' key={provider.id} onClick={() => signIn(provider.id)}>Sign In With {provider.name}</button>
                    ))}
                </>
            )}
        </div>

        <div className="sm:hidden flex relative">
            {isLoggedIn ? (
                <div className='flex'>
                    <Image src='/assets/images/logo.svg' alt='' width={37} height={37} className='rounded-full cursor-pointer' onClick={() => setToggleDropdown(prevState => !prevState)} />
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>My Profile</Link>
                            <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                            <button type="button" className='mt-5 w-full black_btn' onClick={() => {
                                setToggleDropdown(false)
                                signOut()
                            }}>Sign Out</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button type='button' className='outline_btn' key={provider.id} onClick={() => signIn(provider.id)}>Sign In With {provider.name}</button>
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav