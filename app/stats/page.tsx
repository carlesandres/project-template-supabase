import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stats',
};

export default function Stats() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Stats</h1>
        <p>Content goes here</p>
      </main>
    </div>
  );
}
