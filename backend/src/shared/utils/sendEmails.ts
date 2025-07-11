import { transporter } from '@/config/nodemailer';
import { OtpPurpose } from '../models/otp.model';
import { otpEmailTemplates } from '../emails/EmailTemplates';

export const sendEmail = async (
  to: string,
  subject: string,
  purpose: OtpPurpose,
  otp?: string
) => {
  let html;
  if (otp) {
    html = otpEmailTemplates(purpose, otp);
  }
  await transporter.sendMail({
    from: 'Shoppix <nikhil.portfolio.249@gmail.com>',
    to,
    subject,
    html,
  });
};
