import React, { ReactNode } from 'react'
import '@styles/globals.css'
import { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Session } from 'next-auth'

export const metaData: Metadata = {
    title: 'Prompt Share',
    description: 'Discover and Share AI Prompts',
    icons: '/assets/images/logo.svg'
}

interface LayoutProps {
    children: ReactNode
    session: Session
}

const Layout:React.FC<LayoutProps> = ({ children, session }) => {
  return (
    <html lang='en'>
        <body>
            <Provider session={session}>
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