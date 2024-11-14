import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  }
};

export default connectDB;
