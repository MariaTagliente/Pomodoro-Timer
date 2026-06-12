import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ModesContext } from "../context/ModesContext";

export default function Homepage(){

    const {modes, setModes, themes, activeTheme, setActiveTheme, soundMode, setSoundMode} = useContext(ModesContext);

    const [modeIndex, setModeIndex] = useState(0);
    const [countdown, setCountdown] = useState(modes[0].time);
    const [status, setStatus] = useState("idle");
    const [showTicks, setShowTicks] = useState(true);

    const notificationSound = useRef(new Audio("/sounds/notification.mp3"));
    const alarmSound = useRef(new Audio("/sounds/alarm.mp3"))
    
    const mode = modes[modeIndex];

    // AGGIORNAMENTO TIMER
    useEffect(() => {
        setCountdown(modes[modeIndex].time);
        setStatus("idle");
    }, [modes, modeIndex]);


    // TACCHETTE
    const ticks = [];
    for(let i = 0; i < mode.time / 60; i++){
        ticks.push(i);
    }

    // TIMER
    useEffect(()=>{
        const interval = setInterval(()=>{
            if (status !== "running") return;
            
            setCountdown((prev)=>{
                // evita che il countdown vada al di sotto di 0
                if(prev <= 1){
                    return 0; 
                }
                return prev -1;
            })
        }, 1000);

        return()=>clearInterval(interval);
    }, [status]);


    useEffect(() => {
        if (countdown !== 0) return;
        setStatus("paused");

        if (soundMode === "notification") {
            notificationSound.current.play();
        }

        if (soundMode === "alarm") {
            alarmSound.current.play();
        }
    }, [countdown, soundMode]);


    const handleClick = ()=>{
        if (status === "idle") {
            setStatus("running");
        } else if (status === "running") {
            setStatus("paused");
        } else if (status === "paused") {
            setStatus("running");
        }
    };

    const resetTimer = ()=>{
        setCountdown(mode.time);
        setStatus("idle");

        notificationSound.current.pause();
        alarmSound.current.pause();
    };


    // CAMBIO MODALITA'
    const nextMode = ()=>{
        setShowTicks(false);

        setModeIndex((prev)=> {
            const newIndex = ((prev + 1) % modes.length);
            // % modes.length serve per ricominciare da 0 (2 + 1) % 3 = 0

            setCountdown(modes[newIndex].time);
            return newIndex;
        });
        setTimeout(()=>setShowTicks(true), 150);    
    }

    const prevMode = ()=>{
        setShowTicks(false);

         setModeIndex((prev)=> {
            const newIndex = ((prev - 1 + modes.length) % modes.length);

            setCountdown(modes[newIndex].time);
            return newIndex;
        });
        setTimeout(()=>setShowTicks(true), 150);
    }


    // calcolo minuti e secondi
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return(
        <>
          <main className="h-[90vh] flex justify-center items-center">
            <section>
                <article className="flex flex-col items-center">
                    <div style={{ boxShadow: "var(--color-shadow)"}} className="relative size-100 bg-(--color-light) rounded-xl flex flex-col justify-center items-center">
                        {ticks.map((tick)=>{
                            const angle = (360 / ticks.length) * tick;
                            // 360 / 5 = 72 tick = 0 -> 72 * 0 = 0°
                            return(
                                <div key={tick} style={{transform:`rotate(${angle}deg) translateY(-155px)`}} className={`${showTicks ? "opacity-100" : "opacity-0"} absolute w-1 h-3 bg-white rounded-full transition-opacity duration-300 ease-in-out`}></div>
                            )
                        })}
                        
                        <div onClick={handleClick} className="size-60 ring-8 ring-white rounded-full flex justify-center items-center cursor-pointer">
                            
                            {/* IDLE */}
                            {status === "idle" && (
                                <IoIosPlay color="white" className="size-35 hover:scale-110 tansition duration-500"/>
                            )}
                            
                            {/* RUNNING */}
                            {status === "running" && (
                                <span className="text-white text-7xl">
                                    {minutes}:{seconds.toString().padStart(2, "0")}
                                </span>
                            )}
                            
                            {/* PAUSED */}
                            {status === "paused" && (
                                <>
                                   <span className="text-white text-7xl opacity-50">
                                    {minutes}:{seconds.toString().padStart(2, "0")}
                                   </span>
                                   
                                   <div className="absolute">
                                    <IoIosPause color="white" className="size-35 hover:scale-110 tansition duration-500"/>
                                   </div>
                                </>
                            )}
                        </div>
                    </div>
                    

                    {/* MODE */}
                    <div className="mt-10 flex items-center gap-2 text-xl font-semibold uppercase">
                       <div className="flex flex-col items-center leading-none -space-y-3 text-(--color-dark)">
                        <MdKeyboardArrowUp onClick={nextMode} size={25} className="cursor-pointer"/>
                        <MdKeyboardArrowDown onClick={prevMode} size={25} className="cursor-pointer"/>
                       </div>
                       
                        <h2 className="text-white"> {mode.name} </h2>
                        <p className="text-(--color-dark)"> {Math.floor(mode.time / 60)} min</p>
                    </div>

                    {status === "paused" && (                             
                        <button onClick={resetTimer} className="mt-3 cursor-pointer text-white uppercase text-lg opacity-70 hover:opacity-100 transition">
                            reset
                        </button>                            
                    )}
                </article>               
            </section>
            
          </main>
        </>
    )
}