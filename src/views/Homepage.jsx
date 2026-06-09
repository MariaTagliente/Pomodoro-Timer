import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function Homepage(){

    const [countdown, setCountdown] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(()=>{
        const interval = setInterval(()=>{
            if (!isRunning) return;
            setCountdown((prev)=>{
                // evita che il countdown vada al di sotto di 0
                if(prev <= 0){
                   clearInterval(interval);
                   setIsRunning(false);
                   return 0; 
                }
                return prev -1;
            })
        }, 1000);

        return()=>clearInterval(interval);
    }, [isRunning]);


    // calcolo minuti e secondi
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    return(
        <>
          <main className="h-[90vh] flex justify-center items-center">
            <section>
                <article className="flex flex-col items-center gap-12">
                    <div className="relative size-90 bg-(--Emerald) rounded-xl shadow-(--shadowEmerald) flex justify-center items-center">
                        {isRunning ? (
                            <span className="text-white text-7xl">
                                {minutes}:{seconds.toString().padStart(2, "0")}
                                {/* padStar definisce che voglio una stringa lunga 2 caratteri.
                                Se è più corta aggiungi degli 0 all'inizio */}
                            </span>
                            
                        ) : (
                            <button onClick={()=>setIsRunning(true)} className="absolute cursor-pointer hover:scale-110 transition duration-500">
                                <IoIosPlay color="white" className="size-35"/>
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xl font-semibold uppercase">
                       <div className="flex flex-col items-center leading-none -space-y-2.5 text-(--emeraldDark)">
                        <MdKeyboardArrowUp/>
                        <MdKeyboardArrowDown/>
                       </div>
                       
                        <h2 className="text-white">pomodoro</h2>
                        <p className="text-(--emeraldDark)"> {minutes} min</p>
                    </div>
                </article>               
            </section>
            
          </main>
        </>
    )
}