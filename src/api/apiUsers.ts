import toast from "react-hot-toast";

const requestGetUserByToken = async (token:string) => {

  try {
    const response = await fetch(
      process.env.BACKEND_URL + "/usuarios/user-by-token/" + token,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error(error);
    toast.error("Ocurrió un problema");
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Hubo un problema al obtener los usuarios.", error);
  }
};

const getUser = async () => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Hubo un problema al obtener el usuario.", error);
  }
};

const deleteAllUsers = async () => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/usuarios", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Hubo un problema al eliminar a todos los usuarios.", error);
  }
};

export { getAllUsers, requestGetUserByToken, getUser, deleteAllUsers };
