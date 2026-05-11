import { useState, useEffect } from 'react';

const useDebounce = (text, delay = 700) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedText(text);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return debouncedText;
};

export default useDebounce;
