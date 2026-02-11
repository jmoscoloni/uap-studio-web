'use client';
import cn from 'classnames';

interface props {
  isMenuOpen: boolean;
}

const MenuBtn = ({ isMenuOpen }: props) => {
  return (
    <div className="group/btnMenu relative flex h-full cursor-pointer items-center">
      <div className="relative flex w-2 flex-col justify-center gap-[4px] md:w-3 md:gap-[6px]">
        <div
          className={cn(
            'h-px w-full bg-black transition-colors transition-transform delay-[.3s] duration-500 group-hover/btnMenu:bg-[#FB2721]',
            {
              'origin-right! scale-x-0': isMenuOpen
            }
          )}
        ></div>
        <div
          className={cn(
            'h-px w-full origin-left bg-black transition-colors transition-transform delay-[.1s] duration-500 group-hover/btnMenu:bg-[#FB2721]',
            {
              'origin-right! scale-x-0': isMenuOpen
            }
          )}
        ></div>
        <div
          className={cn(
            'h-px w-full origin-left bg-black transition-colors transition-transform delay-[.2s] duration-500 group-hover/btnMenu:bg-[#FB2721]',
            {
              'origin-right! scale-x-0': isMenuOpen
            }
          )}
        ></div>
        <div className="absolute inset-0">
          <div
            className={cn(
              'absolute inset-0 flex origin-center scale-0 items-center justify-center duration-300',
              {
                'scale-100 delay-[.1s]': isMenuOpen
              }
            )}
          >
            <div className="relative flex h-4 w-4 items-center justify-center md:h-5 md:w-5">
              <div
                className={cn(
                  'absolute h-px w-2 origin-center transform bg-black transition-colors duration-300 md:w-3',
                  {
                    'rotate-45 group-hover/btnMenu:bg-[#FB2721]': isMenuOpen
                  }
                )}
              />
              <div
                className={cn(
                  'absolute h-px w-2 origin-center transform bg-black transition-colors duration-300 md:w-3',
                  {
                    '-rotate-45 group-hover/btnMenu:bg-[#FB2721]': isMenuOpen
                  }
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuBtn;
