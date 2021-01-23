const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    employee_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    organization_name: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, default: "customer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
