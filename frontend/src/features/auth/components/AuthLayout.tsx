import type React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  desc: string;
};
export const AuthLayout = ({ children, title, desc }: AuthLayoutProps) => {
  return (
    <div className="grid min-[900px]:items-center min-[900px]:justify-center min-[500px]:p-4">
      <div className="min-h-115 max-w-220 font-[poppins] grid grid-rows-[auto_1fr] rounded-xl min-[500px]:shadow-md min-[700px]:grid-cols-2">
        <section className="bg-gray-50 py-4 px-3 min-[900px]:p-6">
          <div className="">
            <h1 className="font-bold text-xl text-primary capitalize min-[900px]:text-2xl">
              {title}
            </h1>
            <p className="font-semibold text-xs text-gray-500 min-[900px]:text-sm">
              {desc}
            </p>
          </div>
          <div className="pt-6 hidden bg-gray-50 w-full min-[700px]:block min-[900px]:pt-12">
            <img
              src="/illustrations/auth-page.svg"
              alt="shopping"
              className="max-h-70"
            />
          </div>
        </section>
        <section className="px-3 py-4 min-[900px]:p-6">{children}</section>
      </div>
    </div>
  );
};
