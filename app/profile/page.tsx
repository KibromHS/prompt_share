'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string
  creator: {_id: string, image: string, name: string, email: string}
  prompt: string
  tag: string
}


const ProfilePage = () => {
  const {data: session} = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: Post) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE'
        });
        setPosts(posts.filter((p: Post) => p._id !== post._id));
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc='Your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;