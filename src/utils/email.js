const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un email de verificación de cuenta al usuario recién registrado.
 * @param {string} to      - Email destino
 * @param {string} token   - Token de verificación UUID
 */
const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Digital Store" <${process.env.EMAIL_USER}>`,
    to,
    subject: '✅ Verificá tu cuenta en Digital Store',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>¡Bienvenido a Digital Store!</h2>
        <p>Hacé clic en el botón para verificar tu correo electrónico:</p>
        <a href="${verifyUrl}"
           style="display:inline-block;padding:12px 24px;background:#6366f1;color:#fff;
                  border-radius:6px;text-decoration:none;font-weight:bold;">
          Verificar cuenta
        </a>
        <p style="margin-top:20px;color:#888;font-size:12px;">
          Si no te registraste, podés ignorar este email.<br/>
          El link expira en 24 horas.
        </p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail };
