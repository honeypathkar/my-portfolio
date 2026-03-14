
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: '5m' } }, // Automatically delete after 5 minutes
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
