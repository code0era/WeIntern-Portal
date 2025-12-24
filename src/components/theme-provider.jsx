/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({
    theme: "light",
    setTheme: () => null,
});

export function ThemeProvider({
    children,
    storageKey = "vite-ui-theme",
    ...props
}) {
    const [theme] = useState("light"); // 🔒 locked to light

    useEffect(() => {
        const root = window.document.documentElement;

        // remove any dark/system classes
        root.classList.remove("dark", "system");

        // always apply light
        root.classList.add("light");

        // force-save light theme
        localStorage.setItem(storageKey, "light");
    }, []);

    const value = {
        theme: "light",
        setTheme: () => { }, // disabled
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
