import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createToken } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signupService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User signup error', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        { error: { email: 'A user with same email already exists' } },
        'A user with same email already exists'
      );
    }
    throw error; // Important: rethrow unhandled errors
  }
};

export const signinService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'No user found with this mail',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
      const isMatch = bcrypt.compareSync(data.password, user.password);
      if (!isMatch) {
        throw new ClientError({
          explanation: 'Invalid data sent from the client',
          message: 'Invalid password,plz try again',
          statusCode: StatusCodes.BAD_REQUEST
        });
      }
      return {
        username:user.username,
        avatar:user.avatar,
        email:user.email,
        token:createToken({id:user._id,email:user.email})

      }

  } catch (error) {
    console.log('User sign in error', error);
    throw error
  }
};
