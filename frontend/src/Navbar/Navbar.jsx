import "./Navbar.css";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showNavbar} from "../Redux/Features/statusNavbar";
import PinterestLogo from "../img/icons/pinterest.png";

function Navbar(props) {

    const [numberStatus, setStatus] = useState(1);
    const [numberStatusTwo, setStatusTwo] = useState(1);
    const [numberStatusThree, setStatusThree] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(numberStatus);
    }, [numberStatus, numberStatusTwo, numberStatusThree]);

    return (
        <div className="navbar mb-5 h-20 grid items-center p-4 w-full justify-center xl:justify-between 2xl:justify-between xl:grid-flow-col grid-flow-col 2xl:col-span-3 xl:grid-cols-3">
            <div className="link grid sm:min-h-max sm:grid-rows-2 sm:justify-center grid-flow-col justify-center items-center gap-3 lg:col-span-3 md:col-span-3 sm:col-span-3">
                <div className={"business relative"}>
                    <div className={"flex items-center"}>
                        <img src={PinterestLogo} alt=""/>
                        <p onClick={() => setStatus(numberStatus + 1)} className={"flex ml-2"}>Business
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </p>
                    </div>
                    <ul className={`bg-white dropdown-menu-one absolute top-16 sm:top-20 p-2 ${numberStatus % 2 === 0 ? 'block z-50' : 'hidden'}`}>
                        <li className={"mb-3"}>
                            <a href="">Business Hub</a>
                        </li>
                        <li>
                            <a href="">Home Feed</a>
                        </li>
                    </ul>
                </div>

                <div className={"create relative bg-white"}>
                    <div className={"flex items-center"}>
                        <p onClick={() => setStatusTwo(numberStatusTwo + 1)} className={"flex ml-2"}>Create
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </p>
                    </div>
                    <ul className={`bg-white dropdown-menu-one w-24 absolute sm:top-10 sm:left-3 top-16 p-2 ${numberStatusTwo % 2 === 0 ? 'block z-50' : 'hidden'}`}>
                        <li className={"mb-3"}>
                            <a href="">Create Idea Pin</a>
                        </li>
                        <li>
                            <a href="">Create Pin</a>
                        </li>
                    </ul>
                </div>

                <div className={"analytics relative bg-white"}>
                    <div className={"flex items-center"}>
                        <p onClick={() => setStatusThree(numberStatusThree + 1)} className={"flex ml-2"}>Analytics
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </p>
                    </div>
                    <ul className={`bg-white dropdown-menu-one w-24 sm:right-10 sm:top-20 absolute top-16 p-2 ${numberStatusThree % 2 === 0 ? 'block z-50' : 'hidden'}`}>
                        <li className={"mb-3"}>
                            <a href="">Overview</a>
                        </li>
                        <li>
                            <a href="">Audience Insight</a>
                        </li>
                        <li>
                            <a href="">Video</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="search p-2 xl:w-full 2xl:w-full xl:col-span-1 lg:justify-center grid 2xl:col-span-3 grid lg:justify-center lg:hidden md:hidden">
                <div className="form">
                    <input type="text" className={"h-10 p-2"} placeholder={"Search"}/>
                </div>
            </div>

            <div className="xl:hidden link-two grid sm:min-h-max 2xl:justify-end xl:justify-evenly grid-flow-col items-center gap-3 lg:hidden md:hidden">
                <div className="profile">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div className="notifications">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </div>

                <div className="pluss">
                    <svg onClick={() => dispatch(showNavbar())} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Navbar;