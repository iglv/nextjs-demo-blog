import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';
import postsData from '../posts.json';

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Количество постов на странице

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

  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>

      <h1>Blog</h1>

      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2 className="title">{post.title}</h2>
            </Link>
            <p>{post.date}</p>
          </li>
        ))}
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
