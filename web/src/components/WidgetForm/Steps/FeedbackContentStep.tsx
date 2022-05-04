import { CloseButton } from "../../CloseButton"
import {FeedbackType, feedbackTypes} from '..'
import { ArrowLeft } from "phosphor-react"
import { ScreenShootButton } from "../ScreenShootButton"
import { useState } from "react"
import { FormEvent } from "react"

interface FeedbackContentProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}

export function FeedbackContentStep({onFeedbackSent,feedbackType,onFeedbackRestartRequested}: FeedbackContentProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment,setComment] = useState('');

    const feedbackTypesInfo = feedbackTypes[feedbackType]

    function handleSumibitFeedback(event: FormEvent) {
    event.preventDefault()
    onFeedbackSent()
    }

    return (
        <>
        <header>
            <button onClick={onFeedbackRestartRequested} type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                <ArrowLeft className="w-4 h-4"/>
            </button>
            <span className="text-xl leading-6 flex items-center gap-2">
                <img src={feedbackTypesInfo.image.source} alt={feedbackTypesInfo.image.alt} className="w-6 h-6" />
                {feedbackTypesInfo.title}
                </span>
            <CloseButton />
        </header>
        <form className="my-4 w-full" onSubmit={handleSumibitFeedback}>
            <textarea onChange={event => setComment(event.target.value)} className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin " placeholder="Conte com detalhes o que está acontecendo..."/>
            <footer className="flex gap-2 mt-2">
            <ScreenShootButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>
                <button disabled={comment.length === 0} type="submit" className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                    Enviar feedback
                </button>
            </footer>
        </form>
    </>
    )
}