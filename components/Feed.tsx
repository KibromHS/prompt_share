'use client'

import React, { useEffect, useState } from 'react'
import PromptCardList from './PromptCardList';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.FormEvent) => {

  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" className='search_input peer' placeholder='Search for tag or username' value={searchTerm} onChange={handleSearchChange} />
        <PromptCardList data={posts} handleTagClick={() => {}} />
      </form>
    </section>
  );
}

export default Feed;