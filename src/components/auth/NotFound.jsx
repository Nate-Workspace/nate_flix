import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <img
          src="https://undraw.co/api/illustrations/random?color=1d4ed8"
          alt="404 Illustration"
          className="mx-auto mb-6 w-full max-w-lg"
        />
        <Link
          to="/"
          className="px-6 py-3 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition duration-200"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
