export const generateOtp = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return String(otp);
};
