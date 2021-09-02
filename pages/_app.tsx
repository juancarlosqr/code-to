import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import UserProvider from '@/providers/UserProvider';
import '../styles/globals.css';

function CodeApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </UserProvider>
    </>
  );
}

export default CodeApp;
