import { useEffect } from 'react';

/**
 * React Hooks for capturing keystroke.
 * @param {String} key
 * @param {Function} action
 */
const useKeypress = (key: string, action: () => void): void => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action();
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [key, action]);
};

export default useKeypress;
