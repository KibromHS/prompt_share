'use client'

import React, { useEffect, useState } from 'react'
import PromptCardList from './PromptCardList';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" className='search_input peer' placeholder='Search for tag or username' value={searchTerm} onChange={handleSearchChange} />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;