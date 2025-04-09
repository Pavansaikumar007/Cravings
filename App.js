import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./src/components/Header";
import Body from "./src/components/Body";

const Craving = () => {
    return(
        <div>
            <h1>i started creating the cravings app</h1>
        </div>
    )
}

const AppData = () => {
    return(
        <div>
            <Header />
            <Body />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppData />)