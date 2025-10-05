import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { MovieDetail } from '../types/movie';
import type { Credits } from '../types/credit';
import { CreditCard } from '../components/CreditCard';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;
      setIsPending(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
          }),
        ]);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isPending)
    return (
      <div className="bg-black flex justify-center mt-10">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        에러가 발생했습니다.
      </div>
    );

  if (!movie || !credits) return null;

  const directors = credits.crew.filter((c) => c.job === 'Director');
  const castList = credits.cast.slice(0, 20);

  return (
    <div className="text-center bg-black text-white min-h-screen">
      {/* 🎬 상단 Hero Section */}
      <div
        className="relative h-[400px] sm:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : 'none',
        }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/60" />


        {/* 정보 영역 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-4 max-w-3xl">
          <h1 className="text-7xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-300 mb-1">평점 {movie.vote_average.toFixed(1)}</p>
          {movie.tagline && <p className="italic text-gray-400">{movie.tagline}</p>}
        </div>
      </div>

      {/* 🎥 본문 (포스터 + 개요) */}
      <div className="px-6 py-12 flex flex-col md:flex-row md:items-start md:justify-center gap-10 max-w-6xl mx-auto">
        {/* 포스터 */}
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-[300px] md:w-[350px]"
          />
        </div>

        {/* 설명 */}
        <div className="text-left max-w-2xl">
          <h2 className="text-3xl font-bold mb-3 text-gray-500">{movie.title}</h2>
          <p className="text-gray-400 mb-2">
            개봉일: {movie.release_date.replace(/-/g, '.')}
          </p>
          {movie.runtime && <p className="text-gray-400 mb-2">상영시간: {movie.runtime}분</p>}
          <p className="text-lg text-gray-200 leading-relaxed">{movie.overview}</p>
        </div>
      </div>


{/* 본문 → 크레딧 경계 그라데이션 */}
<div className="w-full h-16 bg-gradient-to-b from-black to-neutral-900" />

      {/* 🎞 감독/출연 */}
      <div className="bg-neutral-900 py-10 px-6 rounded-t-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">감독</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {directors.map((d) => (
            <CreditCard
              key={d.id}
              name={d.name}
              role={d.job}
              profilePath={d.profile_path}
            />
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-center">출연진</h2>
        {/* grid로 8열 제한 + 반응형 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 justify-items-center">
          {castList.map((actor) => (
            <CreditCard
              key={actor.id}
              name={actor.name}
              role={actor.character}
              profilePath={actor.profile_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
