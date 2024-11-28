import { Schema, model } from "mongoose";

const conservationSchema = Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timeStamps: true }
);

const Conservation = model("Conservation", conservationSchema);
export default Conservation;
