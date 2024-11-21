import mongoose, { Schema } from "mongoose";

interface IConversation {
    participants: Schema.Types.ObjectId[];
    lastMessageId: Schema.Types.ObjectId;
    messages: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ConversationSchema : Schema<IConversation> = new mongoose.Schema(
    {
        participants: [{ type: Schema.Types.ObjectId, ref:"User", required: true}],
        lastMessageId: { type: Schema.Types.ObjectId, ref:"Message"},
        messages: [{ type: Schema.Types.ObjectId, ref:"Message", default:[]}],
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<IConversation>("Conversation", ConversationSchema)