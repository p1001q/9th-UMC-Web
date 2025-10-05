import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie.ts';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { useParams } from 'react-router-dom';
import { PageNavigator } from '../components/PageNavigator';


export default function MoviePage(){
    const [movies, setMovies] = useState<Movie[]>([]);
    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    // 2. 에러 상태
    const [isError, setIsError] = useState(false);
    // 3. 페이지
    const [page, setPage] = useState(1);

    const {category} = useParams<{ 
        category: string;
    }>(); // useParams 훅 사용법

    useEffect((): void => {
        const fetchMovies = async (): Promise<void> => {
        setIsPending(true);

        try {
            const { data } = await axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
            {
                headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            }
            );

            setMovies(data.results);
        } catch {
            setIsError(true);
        } finally { //마지막에 무조건 실행
            setIsPending(false);
        }
        };

        fetchMovies();
    }, [page, category]); //category가 바뀔 때마다 재실행

    //에러 처리
    if (isError) {
        return ( 
            <div>
            <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
            </div>
        );
    }

return (
    <> {/*컴포넌트 하나만 반환해야하니 빈 태그로 감싸주기*/}
    <PageNavigator page={page} setPage={setPage} />

    {/*로딩바 처리 
    > 삼항 연산자 써도 되긴 하는데 
     바디 부분 길면 가독성이 안 좋아져서 
     강사님은 안 쓰는 편, 스타일 차이*/}
    {isPending && (
        <div className='bg-black flex items-center justify-center h-dvh'>
            <LoadingSpinner />
        </div>
    )}
    {!isPending && (
        <div className="bg-black p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )}

    </>

); }