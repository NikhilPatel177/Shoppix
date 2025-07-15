import { useSearchParams } from 'react-router-dom';

export const GoogleOauthButton = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';
  function handleGoogleRedirect() {
    window.location.href = `http://localhost:8000/api/auth/google?redirectTo=${encodeURIComponent(
      redirectTo
    )}`;
  }

  return (
    <button
      onClick={handleGoogleRedirect}
      type="button"
      className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.5 278.4c0-17.4-1.4-34.2-4-50.5H272v95.5h147.3c-6.4 34.4-25.4 63.6-54 83v68.9h87.3c51.1-47 80.9-116.2 80.9-196.9z"
          fill="#4285F4"
        />
        <path
          d="M272 544.3c72.9 0 134-24.2 178.7-65.9l-87.3-68.9c-24.3 16.3-55.3 25.8-91.4 25.8-70.3 0-130-47.6-151.3-111.5H32.4v70.3C77.5 486.7 168.8 544.3 272 544.3z"
          fill="#34A853"
        />
        <path
          d="M120.7 323.8c-10.3-30.4-10.3-63.4 0-93.8v-70.3H32.4c-38.3 76.6-38.3 157.9 0 234.5l88.3-70.4z"
          fill="#FBBC05"
        />
        <path
          d="M272 107.6c39.6-.6 77.7 13.7 106.8 39.6l79.8-79.8C414.4 24.4 344.4-.2 272 0 168.8 0 77.5 57.6 32.4 157.6l88.3 70.3C142 155.2 201.7 107.6 272 107.6z"
          fill="#EA4335"
        />
      </svg>
      Continue with Google
    </button>
  );
};
