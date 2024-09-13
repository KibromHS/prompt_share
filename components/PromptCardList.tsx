import React from 'react'
import PromptCard from './PromptCard'
import { User } from 'next-auth'

interface PromptCardListProps {
    data: {
        _id: string
        creator: {_id: string, image: string, name: string, email: string}
        prompt: string
        tag: string
    }[]
    handleTagClick: () => void
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
        {data.map((post) => {
            return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} handleEdit={() => {}} handleDelete={() => {}} />
        })}
    </div>
  )
}

export default PromptCardList