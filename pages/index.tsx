import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from 'utils/supabaseClient';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`*`)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error);
        return;
      }
      setPosts(data);
    };
    fetchPosts();
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  const renderedPosts = posts.map((post) => (
    <div key={post.id}>{post.title}</div>
  ));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome!</h1>
        {renderedPosts}

        <textarea
          rows={5}
          className="mt-4 w-full max-w-md rounded-md border border-gray-300
          bg-gray-100/50 p-2
          "
        />
      </main>
    </div>
  );
}
