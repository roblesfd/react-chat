import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: "client" | "admin";
  token: string;
  active: boolean;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    token: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("id").get(function () {
  return this._id.toString();
});

export default mongoose.model<IUser>("User", UserSchema);
