import React , {ReactNode, useCallback, useState} from "react";
import {Router} from "wouter"
import {imageType} from "../../functions/convertComponentToState.ts";
import {useImageLocatorLocation} from "../../hooks/useImageLocatorLocation.ts";
import {imageLocatorContext} from "./imageLocatorContext.ts"

type props = {
    children: ReactNode
}

export const ImageLocatorProvider = ({children}: props) => {
    const [objects, setObjects] = useState<Map<string, imageType>>(new Map())
    const getObject = useCallback((id: string) => {
        return objects.get(id)
    }, [objects])
    return (
        <imageLocatorContext.Provider value={{
            setObjects,
            getObject,
        }}>
            <Router hook={useImageLocatorLocation}>
                {children}
            </Router>
        </imageLocatorContext.Provider>
    );
};
