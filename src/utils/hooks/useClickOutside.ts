import { useEffect, RefObject } from 'react';

/**
 * React Hook that notifies you when a ref has been clicked outside
 * @param {Ref} ref
 * @param {Function} close
 */
const useClickOutside = (ref: RefObject<HTMLElement | null>, close: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, close]);
};

export default useClickOutside;
