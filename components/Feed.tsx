'use client'

import React, { useEffect, useState } from 'react'
import PromptCardList from './PromptCardList';

interface Post {
  _id: string
  creator: Creator
  prompt: string
  tag: string
}

interface Creator {
  _id: string
  image: string
  name: string
  email: string
}

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchTerm === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((p) =>
        p.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.creator.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setFilteredPosts(filtered);
    }
  }

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    setFilteredPosts(posts.filter(p => p.tag == tag));
  }

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPosts(posts);
    }
  }, [posts, searchTerm]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" className='search_input peer' placeholder='Search for tag or username' value={searchTerm} onChange={handleSearchChange} onKeyDown={(e) => e.key == 'Enter' && e.preventDefault()} />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
}

export default Feed;