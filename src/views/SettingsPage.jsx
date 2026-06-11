import { useContext, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";
import { ModesContext } from "../context/ModesContext";

export default function SettingsPage(){

    const navigate = useNavigate();

    const {modes, setModes} = useContext(ModesContext);

    // const [modes, setModes] = useState([
    //     {name: "pomodoro", time: 25 * 60},
    //     {name: "pausa breve", time: 5 * 60},
    //     {name: "pausa lunga", time: 15 * 60}
    // ]); 

    const themes = [
        {id: 1, name: "Coral", background: "#EE6055"},
        {id: 2, name: "LightGreen", background: "#AAF683"},
        {id: 3, name: "Skyblue", background: "#17bebb"},
        {id: 4, name: "Purple", background: "#5B436F"},
        {id: 5, name: "GreyDark", background: "#8d714c"},
        {id: 6, name: "Emerald", background: "#60D394"},           
        {id: 7, name: "Blue", background: "#385c75"},
        {id: 8, name: "GreyDark", background: "#4a4b4e"}, 
    ];

    const [showPopup, setShowPopup] = useState(false);
    const [modeIndex, setModeIndex] = useState(0);

    const mode = modes[modeIndex];

    const incrementTime = ()=>{
        const newModes = [...modes];

        newModes[modeIndex].time += 60;
        setModes(newModes);
    }

    const decrementTime = ()=>{
        const newModes = [...modes];
        
        if(newModes[modeIndex].time > 60){
            newModes[modeIndex].time -= 60;  
        }
        setModes(newModes);
    }

    return(
        <>
           <main className="min-h-screen text-white flex justify-center items-start">
            <MdKeyboardArrowLeft onClick={()=>navigate(-1)} className="text-4xl fixed top-5 left-5 cursor-pointer hover:scale-125 tansition duration-500"/>
                <section className="mt-15 p-5">
                    <article className="flex flex-col justify-center items-center gap-8 uppercase">
                        <h2 className="text-xl opacity-70">durata</h2>
                        <ul className="flex gap-6">
                            {modes.map((mode, index)=>{
                                return(
                                    <li key={mode.name} onClick={()=>{setModeIndex(index); setShowPopup(true);}} className="bg-(--Emerald)/40 p-7 rounded-box shadow-xl cursor-pointer flex flex-col items-center gap-5 hover:scale-105 transition duration-300">
                                        <span className="text-5xl">{Math.floor(mode.time / 60)}</span>
                                        <span className="text-xl font-semibold">{mode.name}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </article>

                    <article className="flex flex-col justify-center items-center gap-7 uppercase">
                        <h2 className="mt-15 text-xl opacity-70">temi</h2>
                        <ul className="bg-(--Emerald)/40 px-38 py-3 rounded-box shadow-xl grid grid-cols-4 gap-4">
                            {themes.map((theme)=>{
                                return(
                                    <li key={theme.id} style={{ backgroundColor: theme.background }} className="w-15 h-15 rounded-box cursor-pointer hover:scale-105 transition"></li>
                                )
                            })}
                        </ul>
                    </article>

                    <article className="flex flex-col justify-center items-center gap-7 uppercase">
                        <h2 className="mt-15 text-xl opacity-70">suoni</h2>
                        <ul className="flex gap-6">
                            <li className="bg-(--Emerald)/40 w-70 py-3 rounded-box shadow-xl cursor-pointer flex flex-col items-center gap-3 hover:scale-105 transition duration-300">
                                <span className="bg-white/60 rounded-full p-2">
                                    <IoClose className="text-5xl text-(--Emerald)"/>
                                </span>
                                
                                <p className="text-xl font-semibold">suono di notifica</p>
                            </li>

                            <li className="bg-(--Emerald)/40 w-70 py-3 rounded-box shadow-xl cursor-pointer flex flex-col items-center gap-3 hover:scale-105 transition duration-300">
                                <span className="bg-white/60 rounded-full p-2">
                                    <FaCheck className="text-5xl text-(--Emerald)"/>
                                </span>
                                
                                <p className="text-xl font-semibold">sveglia</p>
                            </li>
                        </ul>
                    </article>

                    {showPopup && (
                        <div className="fixed inset-0 bg-(--emeraldDark)/75 gap-8 flex flex-col justify-center items-center">
                            <p className="text-xl font-semibold uppercase">{mode.name}</p>
                            <div className="flex items-center gap-6">
                                <IoMdRemove onClick={decrementTime} size={60} className="text-(--emeraldDark) bg-white rounded-full p-2 cursor-pointer"/>
                                <h3 className="text-9xl">{Math.floor(mode.time / 60)}</h3>
                                <IoMdAdd onClick={incrementTime} size={60} className="text-(--emeraldDark) bg-white rounded-full p-2 cursor-pointer"/>
                            </div>

                            <span className="bg-white rounded-full p-2">
                                <FaCheck onClick={()=>setShowPopup(false)} size={40} className="text-(--emeraldDark) cursor-pointer"/>
                            </span>
                        </div>
                    )}
                </section>
           </main>
        </>
    )
}