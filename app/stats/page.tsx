import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stats',
};

export default function Stats() {
  return (
    <div className="min-h-screen pt-20">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-3xl font-bold">Stats</h1>
        <p>Content goes here</p>
      </main>
    </div>
  );
}
