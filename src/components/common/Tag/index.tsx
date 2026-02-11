import cn from 'classnames';

interface TagProps {
  text: string;
  className?: string;
}

const Tag = ({ text, className }: TagProps) => {
  return (
    <span
      className={cn(
        'inline-block rounded-full border border-black px-4 py-1 text-sm uppercase',
        className
      )}
    >
      {text}
    </span>
  );
};

export default Tag;
