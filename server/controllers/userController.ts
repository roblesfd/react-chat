import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { emailConfirmacion } from "../middleware/emailSender";
import crypto from "crypto";

// @desc Obtiene todos los usuarios
// @route GET /users
// @access Private
const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find().select("-password");
    if (!users?.length) {
      return res.status(404).json({ message: "No hay usuarios" });
    }
    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// @desc Crea un usuario
// @route POST /users
// @access Private
const createUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password, email, name, lastname, role } = req.body;

  if (!username || !password || !email || !name || !lastname) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const duplicatedUser = await User.findOne({ username }).collation({
      locale: "es",
      strength: 2,
    });

    if (duplicatedUser) {
      return res.status(409).json({ message: "Nombre de usuario duplicado" });
    }

    const duplicatedEmail = await User.findOne({ email }).exec();

    if (duplicatedEmail) {
      return res.status(409).json({ message: "Correo electrónico duplicado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString("hex");

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      name,
      lastname,
      role,
      token,
    });

    if (user) {
      emailConfirmacion({
        nombre: user.username,
        email: user.email,
        token: user.token,
      });
      return res.status(201).json({ message: `Nuevo usuario: ${username}` });
    } else {
      return res.status(400).json({ message: "Error al crear un usuario" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
  return;
};

// @desc Obtiene un usuario
// @route GET /users/:id
// @access Private
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
  return;
};

// @desc Obtiene un usuario por su token
// @route GET /user-by-token/:token
// @access Private
const getUserByToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ token }).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
  return;
};

// @desc Actualiza datos de usuario
// @route PATCH /users/:id
// @access Private
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { idUser, username, password, email, name, lastname, role } = req.body;

  let { id } = req.params;

  if (id === "undefined") {
    id = idUser;
  }

  if (!id || !username || !password || !email) {
    res.status(400).json({ message: "Todos los campos son obligatorios" });
    return;
  }

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const duplicate = await User.findOne({ username })
      .collation({ locale: "es", strength: 2 })
      .exec();

    if (duplicate && duplicate?._id.toString() !== id) {
      res.status(409).json({ message: "Nombre de usuario ya está en uso" });
      return;
    }

    user.name = name;
    user.lastname = lastname;
    user.username = username;
    user.email = email;
    user.role = role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const userUpdated = await user.save();
    res
      .status(200)
      .json({ message: `Usuario ${userUpdated.username} actualizado` });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error al actualizar el usuario: ${error.message}` });
    }
  }
};

// @desc Elimina un usuario
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    await user.deleteOne();
    res.status(200).json({
      message: `Usuario ${user.username} con ID ${user._id} eliminado exitosamente`,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error al eliminar el usuario: ${error.message}` });
    }
  }
};

// @desc Elimina tdodos los usuario
// @route DELETE /users/
// @access Private
const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().exec();

    if (!users) {
      res.status(400).json({ message: "No hay usuarios" });
      return;
    }

    const result = await User.deleteMany({});
    res.status(200).json({
      message: "Se han eliminado todos los usuarios de la coleccion 'Users'",
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error al eliminar el usuario: ${error.message}` });
    }
  }
};

export default {
  getAllUsers,
  createUser,
  getUser,
  getUserByToken,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
