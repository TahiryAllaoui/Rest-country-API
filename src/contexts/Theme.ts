import { createContext } from "react";

export interface ThemeType {
    dark: boolean;
    setDark: (val: boolean) => void;
};

const Theme = createContext<ThemeType>({
    dark: false,
    setDark: (_val: boolean) => { }
});

export default Theme;