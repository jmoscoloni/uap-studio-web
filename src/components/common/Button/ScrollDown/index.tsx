'use client';

interface ScrollDownProps {
  targetId?: string;
  /** vertical offset in pixels to add to the target position (can be negative) */
  offset?: number;
}

const ScrollDown = ({ targetId, offset }: ScrollDownProps) => {
  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        if (typeof offset === 'number') {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="group flex cursor-pointer items-center"
      aria-label="Scroll down"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="14"
        fill="none"
        viewBox="0 0 12 7"
        className="rotate-0 transition-transform duration-300 group-hover:-translate-y-1"
      >
        <path stroke="#FB2721" strokeWidth="1.4" d="m11.582.374-5.625 5-5.625-5"></path>
      </svg>
    </span>
  );
};
export default ScrollDown;
