
import { createContext, useContext, useState } from "react";
import { Apod } from "./apod-types";

interface ApodContextProps {
    selectedItem?: Apod,
    setSelectedItem: (item: Apod) => void,
}

const initial: ApodContextProps = 
    {
        selectedItem: undefined,
        setSelectedItem: (item: Apod) => {},
    }

export const ApodContext = createContext<ApodContextProps>(initial);

export const useApod = () => useContext(ApodContext);

export function ApodContextProvider({children}: {children: React.ReactNode}) {
    const [selectedItem, setSelectedItem] = useState<Apod>();
    return (
        <ApodContext value={{selectedItem, setSelectedItem}}>
            {children}
        </ApodContext>
    )
}