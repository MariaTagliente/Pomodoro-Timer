import { createContext, useState } from "react";

export const ModesContext = createContext();

export function ModesProvider({children}){
    const [modes, setModes] = useState([
        {name: "pomodoro", time: 25 * 60},
        {name: "pausa breve", time: 5 * 60},
        {name: "pausa lunga", time: 15 * 60}
    ]);

    return(
        <ModesContext.Provider value={{modes, setModes}}>
            {children}
        </ModesContext.Provider>
    )
}