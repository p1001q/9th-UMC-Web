import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie, MovieResponse } from '../types/movie.ts';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { useParams } from 'react-router-dom';


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
    <div className='flex items-center justify-center gap-6 mt-5'> 
        {/*컴포넌트로 따로 빼는 거 추천 / 이전,다음 버튼, 페이지 표시 <헤더 부분?>*/}
        <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
        hover:bg-[#b2dab1] transition-all duration-200 
        disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        
        <span>{page} 페이지</span>
        
        <button className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
        onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
    </div>

    {/*로딩바 처리 
    > 삼항 연산자 써도 되긴 하는데 
     바디 부분 길면 가독성이 안 좋아져서 
     강사님은 안 쓰는 편, 스타일 차이*/}
    {isPending && (
        <div className='flex items-center justify-center h-dvh'>
            <LoadingSpinner />
        </div>
    )}
    {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )}

    </>

); }