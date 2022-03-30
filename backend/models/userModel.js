import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const cartSchema = mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  options: { type: String || Number, required: false },
  optionName: { type: String || Number, required: false },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: false },
  productId: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAuthor: {
      type: Boolean,
      required: true,
      default: false,
    },
    authorRequest: {
      type: Boolean,
      required: true,
      default: false,
    },
    cartItems: [cartSchema],
    shippingAddress: {
      address: { type: String, required: false, default: "" },
      city: { type: String, required: false, default: "" },
      state: { type: String, required: false, default: "" },
      postalCode: { type: String, required: false, default: "" },
      country: { type: String, required: false, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
