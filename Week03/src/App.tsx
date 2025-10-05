import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviesPage.tsx';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// BrowserRouter v5
// createBrowserRouter v6 >> 이걸 기준으로 진행하겠음
// react-router-dom v7 (next.js, remix)

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App(){
  return <RouterProvider router={router} />;
}

export default App;

// movies/upcoming
// movies/popular
// movies/now_playing
// movies/top_rated

// movies?category=upcoming
// movies?category=popular
// movies?category=now_playing
// movies?category=top_rated

// movies/{movie_id}
// movies/123

// movie/category/{movie_id}