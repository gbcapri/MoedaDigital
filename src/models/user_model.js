import db from "../db.js";
import bcrypt from "bcrypt";

const depositSchema = new Schema({
    value: {
      type: Schema.Types.Number,
      min: 1,
    },
    status: {
      type: Schema.Types.String,
      enum: ["FINISHED", "PENDING", "REFUSED", "CANCELLED"],
      default: "PENDING",
    },
  });

const userSchema = new db.Schema({
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
  wallets: {
    type: Schema.Types.ObjectId,
    ref: "Wallets",
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

const User = db.model("User", userSchema);

export default User;
