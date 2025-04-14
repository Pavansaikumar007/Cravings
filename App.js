import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import About from "./src/components/About";
import Error from "./src/components/Error";


const AppLayout = () => {
    const [searchText, setSearchText] = useState("")
    return (
        <div>
            <Header searchText={searchText} setSearchText={setSearchText} />
            <Outlet context={{ searchText }} />
        </div>
    )
}

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/aboutus",
                element: <About />
            }
        ],
        errorElement: <Error />
    },
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <RouterProvider router={AppRouter} />
</React.StrictMode>)