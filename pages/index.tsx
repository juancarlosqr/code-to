import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import Metatags from '@/components/Metatags';

export default function Home() {
  return (
    <div>
      <Metatags />

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
