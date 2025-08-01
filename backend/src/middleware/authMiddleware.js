import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { customErrorResponse, internalServerError } from '../utils/common/responseObject.js';
import { JWT_SCERET } from '../config/serverConfig.js';
import userRepository from '../repositories/userRepository';

export const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'invalid data sent from the client',
          message: 'No Token Provided'
        })
      );
    }
    const response = jwt.verify(token, JWT_SCERET);
    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'invalid data sent from the client',
          message: 'invalid auth token provided'
        })
      );
    }
    const user=await userRepository.getById(response.id)
    req.user=user.id
    next()
  } catch (error) {
    console.log('error in auth middleware', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'invalid data sent from the client',
          message: 'invalid auth token provided'
        })
      );
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error))
  }
};
