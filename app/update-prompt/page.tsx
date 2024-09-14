'use client'

import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`);
        const details: {prompt: string, tag: string} = await res.json();
        setPost({prompt: details.prompt, tag: details.tag});
    }

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${searchParams.get('id')}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        }),
      });

      if (res.ok) {
        router.push('/');
      }
    } catch(e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type='Update'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}

export default UpdatePrompt;