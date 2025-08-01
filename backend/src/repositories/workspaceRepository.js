import { StatusCodes } from 'http-status-codes';
import { Workspace } from '../schema/workspace';
import ClientError from '../utils/errors/clientError';
import { crudRepository } from './crudRepository';
import { User } from '../schema/user';

export const workspaceRepo = {
  ...crudRepository(Workspace),
  getWorkspaceByName: async (workspaceName) => {
    const workspace = await Workspace.findOne({ name: workspaceName });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  getWorkspaceByJoinCode: async (joinCode) => {
    const workspace = await Workspace.findOne({ joinCode });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  addMembersToWorkspace: async (workspaceId, memberId, role) => {
    const workspace = await Workspace.findById({ memberId });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isValidUser = await User.findById({ memberId });
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserAlreadyPartOfWorkspace = await Workspace.members.find(
      (member) => member.memberId == memberId
    );
    if (isUserAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspace.members.push({
      memberId,
      role
    });
    await workspace.save();
  }
};
