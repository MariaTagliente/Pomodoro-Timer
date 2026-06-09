import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router";

export default function Navbar(){
    return(
        <>
           <div className="navbar text-white">
            <div className="flex-1 ml-5">
                <h1 className="font-semibold text-xl">Pomodoro Timer</h1>
            </div>
            
            <div className="flex-none mr-5">
                <Link>
                    <HiOutlineMenuAlt3 size={28} />
                </Link>
            </div>
           </div>
        </>
    )
}