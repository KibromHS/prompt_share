'use client'

import { User } from 'next-auth'
import Image from 'next/image'
import React, { useState } from 'react'

interface PromptCardProps {
  post: {
    id: string
    creator: User
    prompt: string
    tag: string
  },
  handleTagClick: (tag: string) => void,
  handleEdit: () => void,
  handleDelete: () => void
}

const PromptCard: React.FC<PromptCardProps> = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setInterval(() => setCopied(''), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image src={post.creator.image!} alt='user_image' className='rounded-full' width={40} height={40} />
          <div className="flex flex-col">
            <h3 className='font-satoshi font-semibold text-gray-800'>{post.creator.name}</h3>
            <p className="text-inter font-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt=''
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{ post.prompt }</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>{ post.tag }</p>
    </div>
  )
}

export default PromptCard