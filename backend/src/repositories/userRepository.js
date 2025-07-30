import { User } from '../schema/user';
import { crudRepository } from './crudRepository';

const userRepository = {
  ...crudRepository(User),
  getByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },
  getByUsername:async(username)=>{
    const user=await User.findOne({username})
    return user
  }
};

export default userRepository
