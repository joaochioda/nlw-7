import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submiteFeedback = new SubmitFeedbackService(
    {create: createFeedbackSpy},
    {sendEmail: sendEmailSpy}
);

describe('Submite feedback', () => {
    it('should be able to submit feedback', async () => {
        await expect(submiteFeedback.execute({
            type: 'BUG',
            comment: 'comment',
            screenshot: 'data:image/png;base6423123123'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    })
    it('should not be able to submit feedback without type', async () => {
        await expect(submiteFeedback.execute({
            type: '',
            comment: 'comment',
            screenshot: 'data:image/png;base6423123123'
        })).rejects.toThrow();
    })
    it('should not be able to submit feedback without comment', async () => {
        await expect(submiteFeedback.execute({
            type: 'dasdad',
            comment: '',
            screenshot: 'data:image/png;base6423123123'
        })).rejects.toThrow();
    })
    it('should not be able to submit feedback without invalid screeenshot', async () => {
        await expect(submiteFeedback.execute({
            type: 'dasdad',
            comment: 'dsadasd',
            screenshot: 'd'
        })).rejects.toThrow();
    })
})