import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  id: string; 
  userId: Types.ObjectId;
  type: "new_message";
  content: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["new_message"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Asegurarte de que `this` tiene el tipo correcto
NotificationSchema.virtual("id").get(function (this: INotification) {
  if (!this._id) {
    throw new Error("El documento no tiene un _id válido");
  }
  return this._id.toString(); // Convertir a string explícitamente
});

export default mongoose.model<INotification>("Notification", NotificationSchema);
