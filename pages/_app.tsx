import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';

function CodeApp({ Component, pageProps }) {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default CodeApp;
