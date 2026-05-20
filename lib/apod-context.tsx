
import { createContext, useContext, useState } from "react";

interface ApodContextProps {
    selectedVideo?: string,
    setSelectedVideo: (videoTitle: string) => void,
}

const initial: ApodContextProps = 
    {
        selectedVideo: undefined,
        setSelectedVideo: (videoTitle: string) => {},
    }

export const ApodContext = createContext<ApodContextProps>(initial);

export const useVideo = () => useContext(ApodContext);

export function ApodContextProvider({children}: {children: React.ReactNode}) {
    const [selectedVideo, setSelectedVideo] = useState<string>();
    return (
        <ApodContext value={{selectedVideo, setSelectedVideo}}>
            {children}
        </ApodContext>
    )
}