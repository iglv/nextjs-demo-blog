import Head from 'next/head';
import postsData from '../../posts.json';
import Link from 'next/link';

export default function Post({post}) {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>

      <p style={{ paddingBottom: '1rem' }}><Link href="/">Back</Link></p>
      
      <h1 className="title">{post.title}</h1>

      <p className="post">{post.content}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = postsData.posts.map((post) => ({
    params: {id: post.id.toString()},
  }));

  return {paths, fallback: false};
}

export async function getStaticProps({params}) {
  const post = postsData.posts.find((post) => post.id === parseInt(params.id));

  return {
    props: {
      post,
    },
  };
}
