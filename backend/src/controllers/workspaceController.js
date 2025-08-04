import { StatusCodes } from 'http-status-codes';

import {
    deleteWorkspaceService,
  getWorkspacesUserIsMemberOfService,
  WorkspaceService
} from '../services/WorkspaceService.js';
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const createWorkspaceController = async (req, res) => {
  try {
    const response = await WorkspaceService({
      ...req.body,
      owner: req.user
    });
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace created successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getWorkspaceUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getWorkspacesUserIsMemberOfService(req.user);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log('Error in getWorkspaceUserIsMemberOfController', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'));
  } catch (error) {
    console.log('Error in deleteWorkspace', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
