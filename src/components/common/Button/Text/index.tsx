'use client';

interface props {
  text: string;
}

const Text = ({ text }: props) => {
  return (
    <p className="group/textbtn relative text-[1.6rem]">
      {text}
      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-black transition-transform duration-200 group-hover/textbtn:origin-left group-hover/textbtn:scale-x-100"></span>
    </p>
  );
};
export default Text;
