import Loader from '@/components/Loader';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>CODE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>CODE</h1>
        <Loader />
      </main>
    </div>
  );
}
