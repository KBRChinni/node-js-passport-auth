import bcrypt from "bcryptjs";
import User, { IUser } from "../models/userModel";

export const registerUser = async (
  username: string,
  password: string
): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return user.save();
};

export const findUserByUsername = (username: string): Promise<IUser | null> => {
  return User.findOne({ username }).exec();
};
