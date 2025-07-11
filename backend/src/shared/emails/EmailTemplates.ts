import { OtpPurpose } from '../models/otp.model';
import path from 'path';
import fs from 'fs';

export const otpEmailTemplates = (
  templateName: OtpPurpose,
  otpCode: string
): string => {
  const templatePath = path.join(
    __dirname,
    `/src/shared/emails/${templateName}.html`
  );

  const rawHtml = fs.readFileSync(templatePath, 'utf8');
  const finalHtml = rawHtml.replace(/{{OTP_CODE}}/g, otpCode);

  return finalHtml;
};
