import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
    },
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    validate: {
      validator(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          v
        );
      },
    },
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
    unique: true,
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: "Wallet",
    required: true
  },
  role: {
    type: String,
    enum: ["ADMISTRADOR", "USUARIO"],
    required: true,
    default: "USUARIO",
  },
  isActive: {
    type: Boolean,
    unique: true,
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const User = model("User", userSchema);

export default User;


