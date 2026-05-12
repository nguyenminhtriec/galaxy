
import { createContext, useContext, useState } from "react";
import { type Apod } from "@/lib/apod-types";


interface ApodContextProps {
    selectedApod?: Apod,
    setSelectedApod: (apod: Apod) => void,
}

const initial: ApodContextProps = 
    {
        selectedApod: undefined,
        setSelectedApod: (_: Apod) => {},
    }

export const ApodContext = createContext<ApodContextProps>(initial);

export const useApod = () => useContext(ApodContext);

export function ApodContextProvider({children}: {children: React.ReactNode}) {
    const [selectedApod, setSelectedApod] = useState<Apod>();
    return (
        <ApodContext value={{selectedApod, setSelectedApod}}>
            {children}
        </ApodContext>
    )
}