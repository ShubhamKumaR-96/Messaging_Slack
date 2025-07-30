import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email alreday exits'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true, 'username already exits'],
      match: [
        /^[a-zA-Z0-9_]{3,20}$/,
        'Username must characters and contain letters, numbers'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.avatar) {
    this.avatar = `https://robohosh.org/${user.username}`;
  }
  next();
});

export const User = mongoose.model('User', userSchema);
