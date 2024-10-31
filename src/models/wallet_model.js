import { Schema, model } from "mongoose";

const rechargeSchema = new Schema({
  value: {
    type: Schema.Types.Number,
    min: 10,
  },
  status: {
    type: Schema.Types.String,
    enum: ["FINISHED", "PENDING", "REFUSED", "CANCELLED"],
    default: "PENDING",
  },
});

const walletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    balance: {
        type: Schema.Types.Number,
        default: 0,
        min: 0,
    },
    currency: {
        type: Schema.Types.String,
        required: true,
    },
    recharges: [rechargeSchema],
    createdAt: {
        type: Schema.Types.Date,
        required: true,
  },
});

const Wallet = model("Wallet", walletSchema);
export default Wallet;
