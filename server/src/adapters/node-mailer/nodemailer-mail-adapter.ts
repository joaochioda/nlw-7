import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0a3391feff5556",
      pass: "e3e3d9e14fd004"
    }
  });

export class NodemaiderMailAdapter implements MailAdapter {
    async sendEmail({subject, body}: SendMailData) {
         await transport.sendMail({
        from: '"Fred Foo 👻 <teste@teste.com>"',
        to: 'Joao Guilherme <teste2@teste2.com>',
        subject,
        html: body
        })
    }
}