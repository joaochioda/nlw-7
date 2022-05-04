import { CircleNotch } from "phosphor-react";

export function Loader() {
    return(
        <div className="w-6 h-6 items-center flex-1 flex justify-center overflow-hidden">
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin"/>
        </div>
    )
}