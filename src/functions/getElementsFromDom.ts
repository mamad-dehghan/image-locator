import {convertComponentToState} from "./convertComponentToState.ts";

export const getElementsFromDom = () => {
    const elements: NodeListOf<HTMLImageElement> = document.querySelectorAll('[data-save="true"]')
    const elementsMap = new Map<string, ReturnType<typeof convertComponentToState>>
    elements.forEach((el) => {
        const id = el.getAttribute("data-id")
        if (id)
            elementsMap.set(id, convertComponentToState(el))
    })
    return elementsMap
}
