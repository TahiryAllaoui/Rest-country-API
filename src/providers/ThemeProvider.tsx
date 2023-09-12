import { useState } from "react";
import Theme from "../contexts/Theme";


function ThemeProvider({ children }: { children: any }) {
    const [dark, setDark] = useState(false);

    return (
        <Theme.Provider value={{
            dark: dark,
            setDark: setDark
        }}>
            {children}
        </Theme.Provider >
    );
}

export default ThemeProvider;