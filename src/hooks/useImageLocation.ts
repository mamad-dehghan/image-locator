import {useContext} from "react";
import {imageLocatorContext} from "../components/Provider/imageLocatorContext.ts";

export const useImageLocation = (storeId: string) => {
    const {getObject} = useContext(imageLocatorContext)
    return getObject(storeId)
}
