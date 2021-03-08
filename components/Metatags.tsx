import Head from 'next/head';

type MetatagsProps = {
  title?: string;
  description?: string;
};

const Metatags = ({
  title = 'CODE',
  description = 'The new awesome social blogging app!',
}: MetatagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Metatags;
