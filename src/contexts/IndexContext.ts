import { createContext } from "react";

export interface IndexType {
    index: number;
    setIndex: (val: number) => void;
}

const IndexContext = createContext<IndexType>({
    index: 0,
    setIndex: (_val: number) => { }
});
export default IndexContext;