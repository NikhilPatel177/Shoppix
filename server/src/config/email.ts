import nodemailer from 'nodemailer'
import { env } from './env'

export const brevoTransporter = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port:587,
    secure:false,
    auth:{
        user:env.BREVO_SMTP_SERVER,
        pass:env.BREVO_SMTP_PASSWORD
    }
})