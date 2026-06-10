import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function Homepage(){

    const modes = [
        {name: "pomodoro", time: 25 * 60},
        {name: "pausa breve", time: 5 * 60},
        {name: "pausa lunga", time: 15 * 60}
    ];

    const [modeIndex, setModeIndex] = useState(0);
    const [countdown, setCountdown] = useState(modes[0].time);
    const [status, setStatus] = useState("idle");
    const [showTicks, setShowTicks] = useState(true);
    
    const mode = modes[modeIndex];

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
                if(prev <= 0){
                    setStatus("paused");
                    return 0; 
                }
                return prev -1;
            })
        }, 1000);

        return()=>clearInterval(interval);
    }, [status]);


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
                    <div className="relative size-100 bg-(--Emerald) rounded-xl shadow-(--shadowEmerald) flex flex-col justify-center items-center">
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
                       <div className="flex flex-col items-center leading-none -space-y-3 text-(--emeraldDark)">
                        <MdKeyboardArrowUp onClick={nextMode} size={25} className="cursor-pointer"/>
                        <MdKeyboardArrowDown onClick={prevMode} size={25} className="cursor-pointer"/>
                       </div>
                       
                        <h2 className="text-white"> {mode.name} </h2>
                        <p className="text-(--emeraldDark)"> {Math.floor(mode.time / 60)} min</p>
                    </div>

                    {status === "paused" && (                             
                        <button onClick={resetTimer} className="mt-3 cursor-pointer text-white uppercase text-lg opacity-70 hover:opacity-100 transitio">
                            reset
                        </button>                            
                    )}
                </article>               
            </section>
            
          </main>
        </>
    )
}