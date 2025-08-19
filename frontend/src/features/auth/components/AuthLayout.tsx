import { AppLogo } from '@common/components/AppLogo';
// import { cn } from '@common/utils/cn';
import { ChevronLeft, MoveLeft, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authPageImg from '@assets/online-shopping.svg';
import { cn } from '@common/utils/cn';

export const AuthLayout = ({
  children,
  canNavigateBack = false,
  title,
  description,
}: {
  children: React.ReactNode;
  canNavigateBack?: boolean;
  title: string;
  description: string;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || '/';

  return (
    <div className="fixed inset-0 bg-white md:relative md:py-5">
      {/* Mobile Header */}
      <div className="p-2 h-12 flex justify-between items-center md:hidden">
        {canNavigateBack ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="w-5" /> // keeps spacing when no back button
        )}

        <AppLogo />

        <button
          type="button"
          onClick={() => navigate(from)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Grid */}
      <div className="max-w-130 mx-auto xs:shadow-md md:max-w-200 md:grid md:grid-cols-2 rounded-lg overflow-hidden md:shadow-lg">
        {/* Left Section */}
        <section className="flex flex-col justify-between gap-4 p-2 xs:px-4 xs:pt-4 md:p-6">
          <div>
            <h1 className="text-xl font-bold font-poppins">{title}</h1>
            <p className="font-medium text-xs text-muted-foreground md:block">
              {description}
            </p>
          </div>
          <div className="hidden relative md:flex items-center justify-center">
            <div className="bg-blue-200/10 absolute inset-0 rounded-full" />
            <img
              src={authPageImg}
              alt="Online Shopping"
              className="w-60 h-60 relative z-10"
            />
          </div>
        </section>

        {/* Right Section */}
        <section className="p-2 xs:px-4 xs:pb-4 md:p-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={cn(
              'hidden md:flex items-center gap-1 font-semibold p-2 rounded-md transition-colors w-fit',
              canNavigateBack ? 'visible hover:bg-gray-100' : 'invisible'
            )}
          >
            <MoveLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <div>{children}</div>
        </section>
      </div>
    </div>
  );
};
