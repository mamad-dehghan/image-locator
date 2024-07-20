import classNames from "classnames";
import React,  {CSSProperties, DetailedHTMLProps, ImgHTMLAttributes, useEffect, useRef, useState} from "react";
import {imageType} from "../../functions/convertComponentToState.ts";
import {useImageLocation} from "../../hooks/useImageLocation.ts";
import "./ImageWrapper.css"

type transitionStateType = {
    style: CSSProperties,
    where: number
}

type imageWrapperProps =
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
    & {
    storeId: string
}

export const ImageWrapper = (
    {storeId, className, style, ...props}: imageWrapperProps
) => {
    const previousStyle: imageType | undefined = useImageLocation(storeId)
    const [transition, setTransition] = useState<transitionStateType>(Boolean(previousStyle) ? {
        style: {
            ...previousStyle?.styles,
            position: "fixed",
        },
        where: 1
    } : {
        style: {
            ...style,
            position: "static",
            width: "100%",
            height: "100%",
        },
        where: 3
    })
    const ref = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (ref.current) {
            if (transition.where !== 3) {
                setTimeout(() => {
                    const parentBounding = ref.current?.parentElement?.getBoundingClientRect()
                    setTransition({
                        style: {
                            position: "fixed",
                            left: parentBounding?.left,
                            top: parentBounding?.top,
                            width: parentBounding?.width,
                            height: parentBounding?.height,
                        },
                        where: 2
                    })
                    setTimeout(() => {
                        setTransition({
                            style: {
                                ...style,
                                position: "static",
                                width: "100%",
                                height: "100%",
                            },
                            where: 3
                        })
                    }, 200)
                }, 200)
            }
        }
    }, [ref]);

    return (
        <div className={
            classNames(
                "image-wrapper",
                (transition.where < 3) && "not-active"
            )
        }
             style={style}
        >
            <img
                ref={ref}
                data-id={storeId}
                data-save={true}
                src={previousStyle?.src ?? props.src}
                style={transition.style}
            />
        </div>
    )
};
