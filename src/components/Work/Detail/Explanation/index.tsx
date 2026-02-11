interface ExplanationProps {
  text: string;
}

const Explanation = ({ text }: ExplanationProps) => {
  return (
    <section className="relative w-full px-2 lg:px-4">
      <div className="site-grid">
        <div className="col-span-4 lg:col-span-7 lg:col-start-2">
          <p className="h4 font-normal! text-balance">{text}</p>
          <br />
          <p className="h4 font-normal! text-balance">{text}</p>
          <br />
          <p className="h4 font-normal! text-balance">{text}</p>
        </div>
      </div>
    </section>
  );
};

export default Explanation;
