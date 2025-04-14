import React from "react";
import { useRouteError } from "react-router"

const Error = () => {
    const error = useRouteError();
    console.error("Route Error:", error);

    return (
        <div className="text-center p-6">
            <p className="text-2xl font-bold">Oops! Something went wrong.</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
};

export default Error;