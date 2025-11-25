import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SERVICIO || "gmail",
      auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationCode(to: string, code: string) {
    const mailOptions = {
      from: process.env.EMAIL_USUARIO,
      to,
      subject: "Código de verificación",
      html: `
        <h2>Tu código de verificación</h2>
        <p>Ingresa este código en la aplicación para verificar tu cuenta:</p>
        <div style="font-size: 32px; font-weight: bold; margin: 20px 0;">
          ${code}
        </div>
        <p>El código expira en 15 minutos.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}