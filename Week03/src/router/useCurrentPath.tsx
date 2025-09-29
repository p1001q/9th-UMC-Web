// src/router/useCurrentPath.ts
import { useEffect, useState } from 'react';
import { getCurrentPath } from './utils';

export const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleChange = () => setPath(getCurrentPath());

    window.addEventListener('popstate', handleChange);
    window.addEventListener('pushstate', handleChange); // 커스텀 이벤트

    return () => {
      window.removeEventListener('popstate', handleChange);
      window.removeEventListener('pushstate', handleChange);
    };
  }, []);

  return path;
};
