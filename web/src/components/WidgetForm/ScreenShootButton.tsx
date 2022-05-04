import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import {Loader} from '../Loader';

interface ScreenShootButtonProps {
    onScreenshotTook: (screenshot: string | null) => void
    screenshot: string | null
}


export function ScreenShootButton({onScreenshotTook, screenshot}: ScreenShootButtonProps) {
    const [isTakingScreenshot,setIsTakingScreenshot] = useState(false)
    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true)

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image)
        setIsTakingScreenshot(false)
    }

    if (screenshot) {
        return (
        <button 
            style={{
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180,
            }} 
            type="button" 
            className="p-1 w-10 h10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => onScreenshotTook(null)}
            >
            <Trash weight="fill"/>
        </button>)
    }

    return (
        <button onClick={handleTakeScreenshot} type="button" className="p-2 bg-zic-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500">
            {isTakingScreenshot ? <Loader /> :<Camera className="w-6 h-6 text-zinc-100"/> }
        </button>
    )
}