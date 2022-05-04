import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feeedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter
    ) {}
    async execute(request: SubmitFeedbackServiceRequest) {
    const {type, comment, screenshot} = request;

    if (!type) {
        throw new Error("Type is required");
    }

    if (!comment) {
        throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
        throw new Error('Invalid screenshot');
    }

    await this.feedbackRepository.create({
        type,
        comment,
        screenshot
    })
    await this.mailAdapter.sendEmail({
        subject: 'Novo feedback',
        body: [
            `<div style="font-family: sans-serify; font-size: 16px; color: #111;">`,
            `<p>Tipo: ${type}</p>`,
            `<p>Comentario: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    })
    }
}