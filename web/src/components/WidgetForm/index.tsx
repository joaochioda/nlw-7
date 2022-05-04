import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from "../../assets/bug.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import ideaImageUrl from "../../assets/idea.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma lampada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de um balão de pensameento'
        }
    }
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState < FeedbackType | null > (null);
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestarFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg  w-[calc(100vw-2rem)] md:w-auto">
          
          {feedbackSent ? (
              <FeedbackSuccessStep onFeedbackRestartRequested={handleRestarFeedback} /> ): <>
                {!feedbackType ? (
                <FeedbackTypeStep onFeedBackTypeChanged={setFeedbackType}/>
            ) :
                (
                    <FeedbackContentStep onFeedbackSent={() => setFeedbackSent(true)} feedbackType={feedbackType} onFeedbackRestartRequested={handleRestarFeedback}/>
                )
            }
              </>
          }

            <footer className="text-zinc-500">
                Feito com s2 pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank" rel="noopener noreferrer">Rocketseat</a>
            </footer>
        </div>
    );
}