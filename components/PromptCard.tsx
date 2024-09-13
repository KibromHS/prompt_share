import React from 'react'

interface PromptCardProps {
  post: {
    id: string
    userId: string
    prompt: string
    tag: string
  },
  handleTagClick: () => void
}

const PromptCard: React.FC<PromptCardProps> = ({ post, handleTagClick }) => {
  return (
    <div>PromptCard</div>
  )
}

export default PromptCard