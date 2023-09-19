import { useState } from "react";
import IndexContext from "../contexts/IndexContext";


function IndexProvider({ children }: { children: any }) {
    const [index, setIndex] = useState(0);

    return (
        <IndexContext.Provider value={{
            index: index,
            setIndex: setIndex
        }}>
            {children}
        </IndexContext.Provider>
    )
}

export default IndexProvider