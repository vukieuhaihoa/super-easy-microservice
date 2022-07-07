import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './index.module.scss';
import CreatePost from '../components/post/create_post';
import ListPost from '../components/post/list_posts';

// update git

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Microservice with Nodejs and Nextjs</h1>
        <CreatePost />
        <ListPost />
      </main>
    </div>
  );
};

export default Home;