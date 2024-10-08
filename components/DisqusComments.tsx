"use client"

import { DiscussionEmbed } from 'disqus-react';

export default function DisqusComments({ post }) {
  const disqusShortname = 'your-disqus-shortname';
  const disqusConfig = {
    url: `https://yourblog.com/post/${post.id}`,
    identifier: post.id,
    title: post.title,
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}