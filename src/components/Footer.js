const Footer = () => {
    return (
        <div className=" text-center mt-5 font-bold shadow-[-4px_-4px_10px_rgba(0,0,0,0.1)] ">
            <p >© {new Date().getFullYear()} Cravings Inc. All rights reserved.</p>
            <a 
            href="https://github.com/Pavansaikumar007"
            className="text-blue-600 hover:underline"
            >
               Created by Pavan Sai Kumar
            </a>
        </div>
    )
}

export default Footer