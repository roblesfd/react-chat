import nodemailer from "nodemailer";

interface EmailDatos {
  nombre: string;
  email: string;
  token: string;
}

const emailConfirmacion = async (datos: EmailDatos): Promise<void> => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;

  await transport.sendMail({
    from: "E-commerce",
    to: email,
    subject: "Confirma tu cuenta de e-commerce.com",
    text: "Confirma tu cuenta en e-commerce.com",
    html: `
      <p>Hola ${nombre}, confirma tu cuenta en e-commerce.com</p>
      <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
      <a href="${process.env.FRONTEND_URL_DEV}/confirmar/${token}">Confirmar cuenta</a>
      <p>Si no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

const emailOlvidePassword = async (datos: EmailDatos): Promise<void> => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  await transport.sendMail({
    from: "e-commerce",
    to: email,
    subject: "Reestablece tu contraseña de e-commerce.com",
    text: "Reestablece tu contraseña en e-commerce.com",
    html: `
      <p>Hola ${nombre}, has solicitado reestablecer tu contraseña en e-commerce.com</p>
      <p>Haz clic en el siguiente enlace para generar una contraseña nueva:
      <a href="${process.env.FRONTEND_URL_DEV}/contrasena-nueva/${token}">Reestablecer contraseña</a>
      </p>
      <p>Si no solicitaste el cambio de contraseña puedes ignorar este correo.</p>
    `,
  });
};

export { emailConfirmacion, emailOlvidePassword };
