import { useState } from 'react';
import Head from 'next/head';
import postsData from '../../posts.json';
import Link from 'next/link';


export default function Post({ post }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([{ name: 'John', comment: 'Hello', likes: 5 }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = { name, comment, likes: 0 }; // добавляем свойство likes
    setComments([...comments, newComment]);
    setName('');
    setComment('');
  };

  const handleLike = (index) => {
    const newComments = [...comments];
    newComments[index].likes += 1;
    setComments(newComments);
  };

  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>

      <p style={{ paddingBottom: '1rem' }}>
        <Link href="/">Back</Link>
      </p>

      <h1 className="title">{post.title}</h1>

      <p className="post">{post.content}</p>
      <br />
      <hr />
      <br />
      <h2>Comments</h2>
      <br />
      {comments.length > 0 && (
        <ul>
          {comments.map((c, index) => (
            <li key={index}>
              <strong>{c.name}</strong> said: {c.comment}{' '}
              <button className="like" onClick={() => handleLike(index)}>♥	{c.likes}</button>
            </li>
          ))}
        </ul>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <textarea
          cols="30"
          rows="5"
          placeholder="Your comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      
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
