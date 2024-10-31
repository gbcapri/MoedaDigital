import Wallet from "../models/wallet_model.js";
import User from "../models/user_model.js";

export const store = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const wallet = await Wallet.create({
      userId: req.body.userId,
      currency: req.body.currency,
      balance: 0,
      createdAt: new Date(),
    });
    res.status(201).json(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const wallets = await Wallet.find(req.query).populate('userId').exec();
    res.json(wallets);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const show = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id).populate('userId').exec();
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.json(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.json(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const wallet = await Wallet.findByIdAndDelete(req.params.id).exec();
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }
    res.json({ message: "Wallet deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const recharge = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id).exec();
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const recharge = {
      value: req.body.value,
      status: "PENDING",
    };

    wallet.recharges.push(recharge);
    await wallet.save();
    
    res.status(201).json(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
};
