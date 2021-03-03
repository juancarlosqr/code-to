import Navbar from '@/components/Navbar';
import '../styles/globals.css';

function CodeApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      );
    </>
  );
}

export default CodeApp;
