import React, { ReactNode } from 'react'
import '@styles/globals.css'
import { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@app/api/auth/[...nextauth]/route';

export const metadata: Metadata = {
    title: 'Prompt Share',
    description: 'Discover and Share AI Prompts',
    icons: {
        icon: '/assets/images/logo.svg'
    }
}

interface LayoutProps {
    children: ReactNode
}

const Layout:React.FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  console.log('Session:', session);

  return (
    <html lang='en'>
        <body>
            <Provider session={session!}>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Nav />
                    { children }
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default Layout