import React from 'react'
import PromptCard from './PromptCard'

interface PromptCardListProps {
    data: {
        id: string
        userId: string
        prompt: string
        tag: string
    }[]
    handleTagClick: () => void
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
        {data.map((post) => (
            <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
        ))}
    </div>
  )
}

export default PromptCardList