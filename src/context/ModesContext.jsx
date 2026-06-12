import { createContext, useEffect, useState } from "react";

export const ModesContext = createContext();

export function ModesProvider({children}){
    const [modes, setModes] = useState([
        {name: "pomodoro", time: 25 * 60},
        {name: "pausa breve", time: 5 * 60},
        {name: "pausa lunga", time: 15 * 60}
    ]);

    const [themes] = useState([
        {id: 1, name: "Coral", light: "#F28B82", medium: "#EE6055", dark: "#B23A33", shadow: "0 6px 18px rgba(178, 58, 51, 0.8)"},
        {id: 2, name: "LightGreen", light: "#C6F6A6", medium: "#AAF683", dark: "#4F9F4F", shadow: "0 6px 18px rgba(79, 159, 79, 0.8)"},
        {id: 3, name: "Skyblue",  light: "#6FE7E2", medium: "#17BEBB", dark: "#0E6C6A", shadow: "0 6px 18px rgba(14, 108, 106, 0.8)"},
        {id: 4, name: "Purple", light: "#8C6AAE", medium: "#5B436F", dark: "#2E2238", shadow: "0 6px 18px gba(46, 34, 56, 0.8)"},
        {id: 5, name: "Brown", light: "#B8A08A", medium: "#8D714C", dark: "#4E3D28", shadow: "0 6px 18px rgba(78, 61, 40, 0.8)"},
        {id: 6, name: "Emerald", light: "#7AE0A8", medium: "#60D394", dark: "#1E4F35", shadow: "0 6px 18px rgba(30, 79, 53, 0.8)"},           
        {id: 7, name: "Blue", light: "#6F8FAE", medium: "#385C75", dark: "#1C2F3D", shadow: "0 6px 18px rgba(28, 47, 61, 0.8)"},
        {id: 8, name: "DarkGrey", light: "#7C7F86", medium: "#4A4B4E", dark: "#1F2022", shadow: "0 6px 18px rgba(31, 32, 34, 0.8)"}, 
    ]);

    const [activeTheme, setActiveTheme] = useState(themes[0]);

    useEffect(() => {
        const root = document.documentElement;
        
        root.style.setProperty("--color-light", activeTheme.light);
        root.style.setProperty("--color-medium", activeTheme.medium);
        root.style.setProperty("--color-dark", activeTheme.dark);
        root.style.setProperty("--color-shadow", activeTheme.shadow);
    }, [activeTheme]);

    const [soundMode, setSoundMode] = useState("notification");

    return(
        <ModesContext.Provider value={{modes, setModes, themes, activeTheme, setActiveTheme, soundMode, setSoundMode}}>
            {children}
        </ModesContext.Provider>
    )
}