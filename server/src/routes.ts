import express from 'express'
import { NodemaiderMailAdapter } from './adapters/node-mailer/nodemailer-mail-adapter';
import { PrismaFeeedbacksRepository } from './repositories/prisma/prisma-feeedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const prismaFeedBacksRepository = new PrismaFeeedbacksRepository();
    const nodemaiderMailAdapter = new NodemaiderMailAdapter();
    const submitFeedbackService = new SubmitFeedbackService(prismaFeedBacksRepository,nodemaiderMailAdapter)

    await submitFeedbackService.execute({
        type: req.body.type,
        comment: req.body.comment,
        screenshot: req.body.screenshot
    })

    return res.status(201).send()
})