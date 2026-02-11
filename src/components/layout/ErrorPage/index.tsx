interface ErrorPageProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const ErrorPage = ({ title, description, children }: ErrorPageProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mb-8 text-lg text-gray-600">{description}</p>}
        {children && (
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">{children}</div>
        )}
      </div>
    </main>
  );
};

export default ErrorPage;
