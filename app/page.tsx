import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className='head_text text-center'>
            Discover and Share
            <br className="max-md:hidden" />
            <span className='orange_gradient text-center'>AI-Powered Prompts</span>
        </h1>
        <p className='desc text-center'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto cumque, tempore modi fugit veniam fuga officiis assumenda blanditiis numquam! Omnis.
        </p>
        <Feed />
    </section>
  )
}

export default Home