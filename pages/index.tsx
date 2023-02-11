import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome!</h1>

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
