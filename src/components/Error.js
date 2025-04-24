// File: src/components/Error.js

import React from "react";
// ** Important: Assuming you are using react-router-dom v6+, ensure import is correct **
// If your setup truly uses just "react-router", keep that, but "react-router-dom" is standard for web.
import { useRouteError, Link } from "react-router";

const Error = () => {
  // 1. Get the error object from React Router
  const error = useRouteError();
  //image
  const Logo = new URL("../assets/images/errorImg.png", import.meta.url);

  // 2. Log the detailed error to the developer console (very useful!)
  console.error("=== Routing Error Caught by ErrorElement ===");
  console.error(error);
  console.error("==========================================");

  // 3. Prepare variables to display - check for properties common in errors/responses
  let errorStatus = error?.status; // Optional chaining for safety
  let errorStatusText = error?.statusText;
  let errorMessage = error?.message;
  // Sometimes loaders/actions might put custom messages in `error.data`
  let errorDataMessage = typeof error?.data === 'string' ? error.data : null;
  const isDev = process.env.NODE_ENV === "development";

  // Determine the best message to show the user
  const displayMessage =
    errorStatusText || errorMessage || errorDataMessage || "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-8 text-center">
      <img
          // Optional: Add a relevant error image/icon if you have one
          // src="/path/to/your/error-icon.svg"
          // alt="Error"
          src={Logo}
          className="w-30 h-50 mb-6 text-red-500" // Placeholder styling if using an SVG icon library later
          aria-hidden="true" // Hide decorative images from screen readers
      />
      <h1 className="text-3xl font-extrabold text-red-600 mb-4">Oops! Something Went Wrong!</h1>
      
      {/* Display Status Code if available (often from HTTP errors) */}
      {errorStatus && (
        <p className="text-2xl font-semibold text-gray-600 mb-2">
          Error {errorStatus}
        </p>
      )}

      {/* Display the most relevant error message */}
      {/* <p className="text-lg text-gray-700 mb-8 max-w-lg">
        {displayMessage}
      </p> */}

      {/* Display detailed message specifically for 404 Not Found */}
      {errorStatus === 404 && (
        <p className="text-md text-gray-500 mb-8">
          Sorry, we couldn't find the page you were looking for.
        </p>
      )}

      {/* Link to go back home */}
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out"
      >
        Go Back Home
      </Link>

      {/* Optional: Display stack trace only in development for easier debugging */}
      {isDev && error?.stack && (
        <details className="mt-10 text-left w-full max-w-2xl bg-gray-100 p-4 rounded border border-gray-300">
          <summary className="cursor-pointer font-medium text-gray-600">
            Error Stack Trace (Development Only)
          </summary>
          <pre className="text-xs text-gray-500 mt-2 overflow-auto whitespace-pre-wrap break-words">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};

export default Error;