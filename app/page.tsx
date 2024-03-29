import { Metadata } from 'next';
// import { supabase } from 'utils/supabaseClient';
//
export const metadata: Metadata = {
  title: 'My title',
};

export default function Home() {
  // const [posts, setPosts] = useState([]);
  // const [error, setError] = useState<string | null>(null);

  //   const { data, error } = await supabase
  //     .from('posts')
  //     .select(`*`)
  //     .order('created_at', { ascending: false });
  //

  // // if (error) {
  // //   return <div>{error.message}</div>;
  // // }
  // //
  // const renderedPosts = posts.map((post) => (
  //   <div key={post.id}>{post.title}</div>
  // ));
  //
  const renderedPosts = <div>posts</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
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
