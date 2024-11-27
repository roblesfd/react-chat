import mongoose, { Schema } from "mongoose";

interface IConversation {
  id: string;
  participants: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema: Schema<IConversation> = new mongoose.Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [] }],
  },
  {
    timestamps: true,
  }
);

ConversationSchema.virtual("id").get(function () {
  return this._id.toString();
});

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
