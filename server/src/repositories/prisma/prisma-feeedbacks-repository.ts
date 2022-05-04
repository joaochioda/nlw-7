import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feeedbacks-repository";

export class PrismaFeeedbacksRepository implements FeedbackRepository {
    async create({type,comment,screenshot}: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        })
    }
}