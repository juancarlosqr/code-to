import Head from 'next/head';

type MetatagsProps = {
  title?: string;
  description?: string;
  image?: string;
};

const Metatags = ({
  title = 'CODE',
  description = 'The new awesome social blogging app!',
  image = 'https://fireship.io/courses/react-next-firebase/img/featured.png',
}: MetatagsProps) => {
  return (
    <Head>
      <title>{title !== 'CODE' ? `${title} - CODE` : title}</title>
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Metatags;
