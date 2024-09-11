import React, { ReactNode } from 'react'
import '@styles/globals.css'
import { Metadata } from 'next'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metaData: Metadata = {
    title: 'Prompt Share',
    description: 'Discover and Share AI Prompts'
}

interface LayoutProps {
    children: ReactNode
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
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