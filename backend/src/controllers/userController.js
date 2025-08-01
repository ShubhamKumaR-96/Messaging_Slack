import { StatusCodes } from 'http-status-codes';

import { signinService, signupService } from '../services/UserServices.js';
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'user created successfully'));
  } catch (error) {
    console.log('User controller signup error', error);
    console.log(error.statusCode)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const signin=async(req , res)=>{
  try {
    const response=await signinService(req.body)
    return res.status(StatusCodes.OK).json(successResponse(response,'User signed in successfully'))
  } catch (error) {
    console.log("Error while signin ", error)
    if(error.statusCode){
      return res.status(error.statusCode).json(customErrorResponse(error))
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error))
  }
}
