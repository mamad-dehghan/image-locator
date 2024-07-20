import React,  {BaseSyntheticEvent} from "react";
import {BaseLocationHook, Link as L2, LinkProps, useLocation} from "wouter";

// @ts-ignore
export const Link = <T extends BaseLocationHook>({to, href, children, onClick, asChild}: LinkProps<T>) => {
    const [, setLocation] = useLocation()
    return (
        <L2
            to={to}
            asChild={asChild}
            href={href}
            onClick={onClick ?? ((event: BaseSyntheticEvent) => {
                event.preventDefault()
                setLocation(to ?? href)
            })}
        >
            {children}
        </L2>
    );
};
