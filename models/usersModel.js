import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';




const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  address: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true, 
    unique: true,   
  },
  password: {
    type: String,
    required: true,
  }
});
// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model("User", userSchema);

export { User };
