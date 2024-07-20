import {CSSProperties} from "react";

export interface imageType {
    styles: CSSProperties,
    src: string,
}

export const convertComponentToState = (element: HTMLImageElement): imageType => {
    const bounding: DOMRect = element.getBoundingClientRect()
    const elementStyles: Partial<CSSStyleDeclaration> = element?.style ?? {};
    const cssProperties = Object.fromEntries(
        Object.entries(elementStyles).filter(([key, value]) =>
            Boolean(value) &&
            isNaN(Number(key))
        )
    ) as CSSProperties
    return {
        src: element.src,
        styles: {
            ...cssProperties,
            top: bounding.top,
            left: bounding.left,
            width: element.width,
            height: element.height,
        }
    }
}
