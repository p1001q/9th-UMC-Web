import './App.css';
import { Link, Route, Routes } from './router';
import { useCurrentPath } from './router/useCurrentPath';

const MatthewPage = () => {
  const path = useCurrentPath();
  return (
    <div>
      <h1>매튜 페이지</h1>
      <p>현재 경로: {path}</p>
    </div>
  );
};

const AeongPage = () => {
  const path = useCurrentPath();
  return (
    <div>
      <h1>애옹 페이지</h1>
      <p>현재 경로: {path}</p>
    </div>
  );
};

const JoyPage = () => {
  const path = useCurrentPath();
  return (
    <div>
      <h1>조이 페이지</h1>
      <p>현재 경로: {path}</p>
    </div>
  );
};

const NotFoundPage = () => {
  const path = useCurrentPath();
  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>현재 경로: {path}</p>
    </div>
  );
};

export { MatthewPage, AeongPage, JoyPage, NotFoundPage };

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/matthew'>MATTHEW</Link>
      <Link to='/aeong'>AEONG</Link>
      <Link to='/joy'>JOY</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/matthew' component={MatthewPage} />
        <Route path='/aeong' component={AeongPage} />
        <Route path='/joy' component={JoyPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;