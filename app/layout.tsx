import React, { ReactNode } from 'react'
import '@styles/globals.css'
import { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Session } from 'next-auth'

export const metadata: Metadata = {
    title: 'Prompt Share',
    description: 'Discover and Share AI Prompts',
    icons: {
        icon: '/assets/images/logo.svg'
    }
}

interface LayoutProps {
    children: ReactNode
    params: {
        session: Session
    }
}

const Layout = async ({ children, params } : LayoutProps) => {

  return (
    <html lang='en'>
        <body>
            <Provider session={params.session!}>
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