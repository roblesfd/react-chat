import * as Yup from "yup";

const passwordRegExp = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "6 carácteres mínimo")
    .max(20, "20 carácteres máximo")
    .required("Este campo es obligatorio"),
  name: Yup.string().required("Este campo es obligatorio"),
  lastname: Yup.string().required("Este campo es obligatorio"),
  password: Yup.string()
    .required("Este campo es obligatorio")
    .min(8, "8 carácteres mínimo")
    .max(18, "18 carácteres máximo")
    .matches(
      passwordRegExp,
      "Al menos una letra, un número y un carácter especial"
    ),
  email: Yup.string()
    .email("Dirección de correo inválida")
    .required("Este campo es obligatorio"),
});

const loginSchema = Yup.object().shape({
  password: Yup.string().required("La contraseña es obligatoria"),
  username: Yup.string().required("El nombre de usuario es obligatorio"),
});

export { signupSchema, passwordRegExp, loginSchema };
