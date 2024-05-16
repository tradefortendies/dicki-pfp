import Head from 'next/head';
import ImageComposer from '../components/ImageComposer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dicki PFP</title>
        <meta name="description" content="Combine images to create a custom picture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ImageComposer />
      </main>
    </div>
  );
}