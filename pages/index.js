import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';
import postsData from '../posts.json';

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Количество постов на странице
  const [likes, setLikes] = useState(postsData.posts.map(() => 0)); // Количество лайков для каждого поста

  // Вычисление индекса последнего поста на странице
  const indexOfLastPost = currentPage * postsPerPage;
  // Вычисление индекса первого поста на странице
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Выбор постов для текущей страницы
  const currentPosts = postsData.posts.slice(indexOfFirstPost, indexOfLastPost);

  // Вычисление общего количества страниц
  const totalPages = Math.ceil(postsData.posts.length / postsPerPage);

  // Функция для переключения на следующую страницу
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Функция для переключения на предыдущую страницу
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Функция для обработки клика на кнопку лайка
  const handleLikeClick = (postId) => {
    const newLikes = [...likes];
    newLikes[postId - 1]++;
    setLikes(newLikes);
  };

  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>

      <h1>Blog</h1>

      <ul>
        {currentPosts.map((post, index) => (
          <li key={post.id} className="post">
            <Link href={`/posts/${post.id}`}>
              <h2 className="title">{post.title}</h2>
            </Link>
            <p>{post.date}</p>
            <p>
              Likes: {likes[post.id - 1]}{' '}
              <button onClick={() => handleLikeClick(post.id)}>Like</button>
            </p>
          </li>
        ))}
        <li>
          <Link href={`/captcha`}>
            <h2 className="title">Captcha Page</h2>
          </Link>
          <p>1.1.1</p>
          <p>
            Likes: {likes[999 - 1]} <button onClick={() => handleLikeClick('999')}>Like</button>
          </p>
        </li>
      </ul>

      {/* Пагинация */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={prevPage} className="nextPrev">
            Prev
          </button>
        )}

        {currentPage < totalPages && (
          <button onClick={nextPage} className="nextPage">
            Next
          </button>
        )}
      </div>
    </div>
  );
}
