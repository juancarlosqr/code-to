import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import UserProvider from '@/providers/UserProvider';
import '../styles/globals.css';

function CodeApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </UserProvider>
  );
}

export default CodeApp;
