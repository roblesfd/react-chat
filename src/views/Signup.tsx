import { Link } from "react-router-dom";
import FormContainer from "../components/form/FormContainer";
import FormHeader from "../components/form/FormHeader";
import FormFooter from "../components/form/FormFooter";
import FormInput from "../components/form/FormInput";
import { signupSchema } from "../utils/inputValidationSchema";
import { onSignup } from "../api/apiAuth";

// (async () => {
//   try {
//     const res = await getAllUsers();
//     console.log(res);
//   } catch (error) {
//     console.error(error);
//   }
// })();

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <FormContainer checkoutSchema={signupSchema} onSubmit={onSignup}>
        <FormHeader>
          <h1 className={`text-xl font-bold text-center mb-6`}>
            Registro de cuenta
          </h1>
        </FormHeader>
        <FormInput
          inputType="text"
          labelText="Nombre de usuario"
          inputName="username"
        />
        <FormInput inputType="text" labelText="Nombre" inputName="name" />
        <FormInput inputType="text" labelText="Apellido" inputName="lastname" />
        <FormInput
          inputType="email"
          labelText="Correo electrónico"
          inputName="email"
        />
        <FormInput
          inputType="password"
          labelText="Contraseña"
          inputName="password"
        />
        <FormFooter>
          <Link
            className="inline-block align-baseline font-bold text-sm text-primary-950"
            to="/ingresar"
          >
            ¿Ya tienes una cuenta? Iniciar sesión
          </Link>
          <button
            type="submit"
            className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrarme
          </button>
        </FormFooter>
      </FormContainer>
    </div>
  );
};

export default Signup;
