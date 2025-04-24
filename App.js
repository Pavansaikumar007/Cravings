import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { useState, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import About from "./src/components/About";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import Footer from "./src/components/Footer";

const Instamart = lazy(() => import("/src/components/Instamart.js"))
const About = lazy(() => import("./src/components/About"))

const AppLayout = () => {
    const [searchText, setSearchText] = useState("")
    return (
        <div className="flex flex-col min-h-screen">
            <Header searchText={searchText} setSearchText={setSearchText} />
            <main className="flex-1 ">
                <Outlet context={{ searchText }} />
            </main>
            <Footer />
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
                element: <Suspense fallback={<h1>Loading...</h1>} >
                    <About />
                </Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/instamart",
                element: <Suspense fallback={<h1>Loading ...</h1> }>
                    <Instamart />
                </Suspense>
            }
        ],
        errorElement: <Error />
    },
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <RouterProvider router={AppRouter} />
</React.StrictMode>)