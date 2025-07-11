import nodemailer from 'nodemailer'
import env from './env';

export const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: env.BREVO_EMAIL, 
    pass: env.BREVO_SMTP_KEY, 
  },
});