'use client';
import cn from 'classnames';
import s from './index.module.css';
import { ReactNode } from 'react';

interface LoaderBtnProps {
  children?: ReactNode;
  className?: string;
}

const LoaderBtn = ({ children = 'Enter', className }: LoaderBtnProps) => {
  return (
    <div
      className={cn(
        'group/btn relative cursor-pointer border border-solid border-[#0003] px-[2.4rem] py-1 duration-300',
        'hover:border-[#0000]',
        s.btn,
        className
      )}
    >
      <span className="absolute -top-[0rem] -right-px h-[8px] w-px -translate-y-1 bg-black opacity-0 duration-300 group-hover/btn:translate-y-0 group-hover/btn:opacity-100"></span>
      <span className="absolute top-0 -right-[0rem] h-px w-[16px] translate-x-1 bg-black opacity-0 duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"></span>
      <span className="absolute -bottom-[0rem] -left-0 h-[14px] w-px translate-y-1 bg-black opacity-0 duration-300 group-hover/btn:translate-y-0 group-hover/btn:opacity-100"></span>
      <span className="absolute -bottom-0 -left-[0] h-px w-[18px] -translate-x-1 bg-black opacity-0 duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"></span>
      <p className="p-lg">{children}</p>
    </div>
  );
};
export default LoaderBtn;
