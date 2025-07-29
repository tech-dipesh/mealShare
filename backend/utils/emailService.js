import transporter from '../config/email.js';

export const sendVerificationEmail = (to, url) =>
  transporter.sendMail({
    to,
    subject: 'Verify your FoodShare email',
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });

export const sendResetPasswordEmail = (to, url) =>
  transporter.sendMail({
    to,
    subject: 'FoodShare Password Reset',
    html: `<p>Reset your password by clicking <a href="${url}">here</a>.</p>`,
  });
