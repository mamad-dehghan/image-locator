import {createContext} from "react";
import {imageType} from "../../functions/convertComponentToState.ts";

interface LocatorContextType {
    setObjects: (objects: Map<string, imageType>) => void;
    getObject: (id: string) => imageType | undefined;
}

export const imageLocatorContext = createContext<LocatorContextType>({
    setObjects: () => {
    },
    getObject: () => undefined
})
