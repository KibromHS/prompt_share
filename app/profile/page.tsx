'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const {data: session} = useSession();
  const [posts, setPosts] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: any) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE'
        });
        setPosts(posts.filter((p: any) => p._id !== post._id));
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