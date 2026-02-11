import Link from 'next/link';
import cn from 'classnames';
import { ReactNode } from 'react';

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonElementProps extends BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

type ButtonProps = LinkButtonProps | ButtonElementProps;

const isLinkButton = (props: ButtonProps): props is LinkButtonProps => {
  return 'href' in props;
};

// const sizeStyles = {
//   sm: 'px-3 py-2 text-sm',
//   md: 'px-4 py-3 text-base',
//   lg: 'px-6 py-4 text-lg'
// };

const Button = (props: ButtonProps) => {
  const { children, className, disabled, ...rest } = props;

  const buttonClasses = cn(
    // baseStyles,
    // variantStyles[variant],
    // sizeStyles[size],
    {
      'pointer-events-none opacity-50': disabled
    },
    className
  );

  const buttonContent = <>{children}</>;

  if (isLinkButton(props)) {
    const { href, target, rel } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={cn('cursor-pointer', buttonClasses)}
        {...rest}
      >
        {buttonContent}
      </Link>
    );
  }

  const { type = 'button', onClick } = props as ButtonElementProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn('cursor-pointer', buttonClasses)}
      {...rest}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
