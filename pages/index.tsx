import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome!</h1>

        <textarea rows={5}
          className="border border-gray-300 rounded-md p-2 mt-4 w-full
          max-w-md bg-gray-100/50
          "
          />

      </main>
    </div>
  );
}
