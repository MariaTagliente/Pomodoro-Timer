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

    const {modes, setModes, themes, activeTheme, setActiveTheme, soundMode, setSoundMode} = useContext(ModesContext); 

    const [showPopup, setShowPopup] = useState(false);
    const [modeIndex, setModeIndex] = useState(0);

    const mode = modes[modeIndex];


    // SCELTA SUONI
    const soundOptions = [
        {key: "notification", label: "suono di notifica"},
        {key: "alarm", label: "sveglia"}
    ]

    const toggleSound = (key)=>{
        setSoundMode(key);
    }


    // SCELTA DURATA
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
                                    <li key={mode.name} onClick={()=>{setModeIndex(index); setShowPopup(true);}} className="bg-(--color-light) p-7 rounded-box shadow-xl cursor-pointer flex flex-col items-center gap-5 hover:scale-105 transition duration-300">
                                        <span className="text-5xl">{Math.floor(mode.time / 60)}</span>
                                        <span className="text-xl font-semibold">{mode.name}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </article>

                    <article className="flex flex-col justify-center items-center gap-7 uppercase">
                        <h2 className="mt-15 text-xl opacity-70">temi</h2>
                        <ul className="bg-(--color-light) px-38 py-3 rounded-box shadow-xl grid grid-cols-4 gap-4">
                            {themes.map((theme)=>{
                                return(
                                    <li key={theme.id} onClick={()=>setActiveTheme(theme)} className= "w-15 h-15 rounded-box cursor-pointer hover:scale-105 transition flex justify-center items-center" style={{ backgroundColor: theme.medium}}>
                                        {activeTheme.id === theme.id && (
                                          <FaCheck className="text-4xl bg-white rounded-full p-1.5" style={{color: activeTheme.medium}}/>  
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </article>

                    <article className="flex flex-col justify-center items-center gap-7 uppercase">
                        <h2 className="mt-15 text-xl opacity-70">suoni</h2>
                        <ul className="flex gap-6">
                            {soundOptions.map((sound)=>{
                                return(
                                    <li key={sound.key} onClick={()=>toggleSound(sound.key)} className="bg-(--color-light) w-70 py-3 rounded-box shadow-xl cursor-pointer flex flex-col items-center gap-3 hover:scale-105 transition duration-300">
                                        <span className={`${soundMode === sound.key ? "bg-white" : "bg-white/60"} rounded-full p-2`}>
                                           {soundMode === sound.key ? (
                                            <FaCheck className="text-5xl text-(--color-light)"/>
                                           ) : (
                                            <IoClose className="text-5xl text-(--color-light)"/>
                                           )}                           
                                        </span>
                                        
                                        <p className="text-xl font-semibold"> {sound.label} </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </article>

                    {showPopup && (
                        <div className="fixed inset-0 bg-(--color-dark)/75 gap-8 flex flex-col justify-center items-center">
                            <p className="text-xl font-semibold uppercase">{mode.name}</p>
                            <div className="flex items-center gap-6">
                                <IoMdRemove onClick={decrementTime} size={60} className="text-(--color-dark) bg-white rounded-full p-2 cursor-pointer hover:scale-110 transition"/>
                                <h3 className="text-9xl">{Math.floor(mode.time / 60)}</h3>
                                <IoMdAdd onClick={incrementTime} size={60} className="text-(--color-dark) bg-white rounded-full p-2 cursor-pointer hover:scale-110 transition"/>
                            </div>

                            <span className="bg-white rounded-full p-3 hover:bg-(--color-light) text-(--color-dark) hover:text-white cursor-pointer">
                                <FaCheck onClick={()=>setShowPopup(false)} size={40}/>
                            </span>
                        </div>
                    )}
                </section>
           </main>
        </>
    )
}