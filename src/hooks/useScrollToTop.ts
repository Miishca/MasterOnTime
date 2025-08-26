import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollToTop?: boolean } | null;
    if (state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
};

export default useScrollToTop;