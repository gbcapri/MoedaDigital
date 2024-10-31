import Transaction from "../models/transaction_model.js";
import Wallet from "../models/wallet_model.js";
import User from "../models/user_model.js";

export const createTransaction = async (req, res) => {
  try {
    const { walletFromId, walletToId, amount, currency } = req.body;

    const walletFrom = await Wallet.findById(walletFromId).exec();
    if (!walletFrom) {
      return res.status(404).json({ error: "Wallet from not found" });
    }

    const walletTo = await Wallet.findById(walletToId).exec();
    if (!walletTo) {
      return res.status(404).json({ error: "Wallet to not found" });
    }

    if (walletFrom.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const transaction = await Transaction.create({
      walletFrom: walletFromId,
      walletTo: walletToId,
      amount,
      type: "transfer",
      status: "pending",
      currency,
      createdAt: new Date(),
    });

    walletFrom.balance -= amount;
    walletTo.balance += amount;

    await walletFrom.save();
    await walletTo.save();

    transaction.status = "completed";
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const transactions = await Transaction.find(req.query)
      .populate('walletFrom walletTo')
      .exec();
    res.json(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const show = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('walletFrom walletTo')
      .exec();
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
};
