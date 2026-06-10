import { BsArrowLeft } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";

export default function SettingsPage(){

    const navigate = useNavigate();

    return(
        <>
           <main className="min-h-screen text-white">
            <MdKeyboardArrowLeft onClick={()=>navigate(-1)} className="text-4xl font-semibold fixed top-5 left-5 cursor-pointer hover:scale-125 tansition duration-500"/>
           </main>
        </>
    )
}