import {useContext, useEffect, useState} from "react";
import {BaseLocationHook} from "wouter";
import {navigate as navigateW} from "wouter/use-browser-location";
import {imageLocatorContext} from "../components/Provider/imageLocatorContext.ts";
import {getElementsFromDom} from "../functions/getElementsFromDom.ts";

export const useImageLocatorLocation: BaseLocationHook = () => {
    const {setObjects} = useContext(imageLocatorContext)
    const [location, setLocation] = useState(window.location.pathname);

    const navigate = (to: string, options: {
        state?: Record<string, any>,
        replace?: boolean
    } = {}) => {
        // TODO: check for options.replace
        setObjects(getElementsFromDom())
        setLocation(to);
        navigateW(to, {
            replace: options.replace, state: options.state
        })
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    useEffect(() => {
        const handlePopState = () => {
            setObjects(getElementsFromDom())
            setLocation(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return [location, navigate];
};
