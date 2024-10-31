import { Schema, model } from "mongoose";

  const transactionSchema = new Schema({
    walletFrom: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      default: null,
    },
    walletTo: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["transfer", "deposit", "withdraw"],
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    currency: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: "",
    },
  });

  
  const Transaction = model("Transaction", transactionSchema);
  
  export default Transaction;
  
  