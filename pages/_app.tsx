import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import UserProvider from '@/providers/UserProvider';
import '../styles/globals.css';

function CodeApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default CodeApp;
