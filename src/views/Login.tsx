import { Link } from "react-router-dom";
import FormContainer from "../components/form/FormContainer";
import FormHeader from "../components/form/FormHeader";
import FormInput from "../components/form/FormInput";
import FormFooter from "../components/form/FormFooter";
import { loginSchema } from "../utils/inputValidationSchema";
import { onLogin } from "../api/apiAuth";

const Login = () => {
  return (
    <div
      data-testid="login"
      className="min-h-screen flex items-center justify-center"
    >
      <FormContainer checkoutSchema={loginSchema} onSubmit={onLogin}>
        <FormHeader>
          <h1 className={`text-xl font-bold text-center mb-6`}>
            Ingresa a tu cuenta
          </h1>
        </FormHeader>
        <FormInput
          inputType="text"
          labelText="Nombre de usuario"
          inputName="username"
        />
        <FormInput
          inputType="password"
          labelText="Contraseña"
          inputName="password"
        />
        <FormFooter>
          <Link
            className=" font-medium text-sm text-primary-950"
            to="/registrarse"
          >
            ¿No estas registrado?{" "}
            <span className="font-semibold">Crear una cuenta</span>
          </Link>
          <button
            type="submit"
            className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ingresar
          </button>
        </FormFooter>
      </FormContainer>
    </div>
  );
};

export default Login;
