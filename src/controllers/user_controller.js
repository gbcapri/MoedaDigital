import User from "../models/user_model.js";

export const store = async (req, res) => {
  try {
    const content = await User.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await User.find(req.query).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await User.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await User.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const content = await User.findByIdAndDelete(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, isActive } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "USUARIO",
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if(!user) {
      res.sendStatus(404);
    }
    res.json();
  } catch (error) {
    res.status(400).send(error);
  }
};