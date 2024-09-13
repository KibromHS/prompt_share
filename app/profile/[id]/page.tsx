'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile';
import { useParams } from 'next/navigation';

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

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState({_id: '', name: '', email: ''});
  const params = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setPosts(data);
      const resUser = await fetch(`/api/users/${params.id}`);
      const dataUser: Creator = await resUser.json();
      setUser({_id: dataUser._id, name: dataUser.name, email: dataUser.email});
    }

    fetchPosts();
  }, []);

  const handleEdit = (post: any) => {
  }

  const handleDelete = async (post: any) => {
  }

  return (
    <Profile
      name={user.name ?? user.email}
      desc={`Welcome to ${user.name ?? user.email}'s personalized profile.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;