import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '현재 상영중' },
  { to: '/movies/top_rated', label: '높은 평점' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

export const Navbar = () => {
  return (
    <div className='flex gap-6 px-10 py-6 bg-black text-lg'>

      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? 'text-red-500 font-bold' : 'text-gray-300 hover:text-red-300'
        }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
