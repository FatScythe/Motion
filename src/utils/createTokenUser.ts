import { IUser } from "../models/user.model";

const createTokenUser = (
  user: IUser
): Pick<IUser, "name" | "email" | "_id" | "role" | "isSubscribed"> => {
  return {
    name: user.name,
    email: user.email,
    _id: user._id,
    role: user.role,
    isSubscribed: user.isSubscribed,
  };
};

export default createTokenUser;
