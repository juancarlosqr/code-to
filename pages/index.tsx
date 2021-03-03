import Head from 'next/head';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

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
        <section>
          <button
            onClick={() =>
              toast.success('Welcome to CODE!', {
                style: {
                  background: '#333',
                  color: '#fff',
                },
              })
            }
          >
            Welcome
          </button>
        </section>
      </main>
    </div>
  );
}
