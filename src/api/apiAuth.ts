import toast from "react-hot-toast";

const onLogout = async () => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      if (typeof window !== "undefined") sessionStorage.removeItem("jwt");

      toast.success("Cerrando sesión");
      setTimeout(() => {
        location.href = "/ingresar";
      }, 2000);
    } else {
      toast.error(data.message || "Error al iniciar sesión.");
    }
  } catch (error) {
    console.error(error);
    console.error("Ocurrió un problema");
  }
};

type LoginFormProps = {
  username: string;
  password: string;
};

const onLogin = async (values: LoginFormProps) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(data.accessToken));
      }
      toast.success("Has iniciado sesión");
      setTimeout(() => {
        location.href = "/";
      }, 2000);
    } else {
      toast.error(data.message || "Error al iniciar sesión.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Ocurrió un problema");
  }
};

type SignupFormProps = {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
};

const onSignup = async (values: SignupFormProps) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(response);

    if (response.ok) {
      toast.success("Cuenta creada exitosamente.");
      setTimeout(() => {
        window.location.href = "/ingresar";
      }, 2000);
    } else {
      toast.error(data.message || "Hubo un problema con el registro.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Hubo un problema con el registro.");
  }
};

export { onLogout, onLogin, onSignup };
