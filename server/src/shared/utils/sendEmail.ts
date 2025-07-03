import nodemailer from 'nodemailer';
import { respondErr, respondServerErr } from './sendReponse';
import { brevoTransporter } from '../../config/email';
interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (
  options: SendEmailOptions
): Promise<nodemailer.SentMessageInfo> => {
  const {
    from = 'Shoppix <nikhil.portfolio.249@gmail.com>',
    to,
    subject,
    html,
  } = options;
  try {
    const info = await brevoTransporter.sendMail({ from, to, subject, html });
    return info;
  } catch (error) {
    console.log('Failed to send email : ', error);
  }
};
