import { StatusCodes } from "http-status-codes"

import { WorkspaceService } from "../services/WorkspaceService.js"
import { customErrorResponse, internalServerError, successResponse } from "../utils/common/responseObject.js"

export const createWorkspaceController=async(req , res )=>{
    try {
        const response=await WorkspaceService({
            ...req.body,
            'owner':req.user
        })
        return res.status(StatusCodes.CREATED).json(successResponse(response,"Workspace created successfully"))
    
    } catch (error) {
        console.log(error)
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error))
        
    }
}