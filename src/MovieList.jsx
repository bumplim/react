import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const API_KEY = 'd261066d0b9047a2735bac1f932bc882'; // 여기에 본인의 API 키를 입력하세요.
  const API_URL = `https://api.themoviedb.org/3/movie/popular`;
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
  const itemsPerPage = 9; // 한 페이지에 표시할 항목 수

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1, // 전체 데이터 가져오기 위해 페이지 1로 설정
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_URL]);

  // 페이지에 맞는 데이터 슬라이스
  const displayedMovies = movies.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(movies.length / itemsPerPage); // 총 페이지 수 계산

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='content'>
      <h1>Popular Movies</h1>
      <ul>
        {displayedMovies.map((movie, index) => (
          <li key={movie.id}>
            <div>
              <img
                src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <h2>
              <span>{(page - 1) * itemsPerPage + (index + 1)}.</span> {movie.title}
            </h2>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
          </li>
        ))}
      </ul>

      {/* 번호 형식의 페이징 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '0 5px',
              padding: '8px 12px',
              backgroundColor: page === index + 1 ? 'blue' : 'lightgray',
              color: page === index + 1 ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieList;