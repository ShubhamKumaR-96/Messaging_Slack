import { StatusCodes } from 'http-status-codes';
import { Workspace } from '../schema/workspace.js';
import ClientError from '../utils/errors/clientError.js';
import { crudRepository } from './crudRepository.js';
import { User } from '../schema/user';
import channelRepo from './channelRepo.js';

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
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserAlreadyPartOfWorkspace = workspace.members.find(
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

    return workspace
  },
  addChannelToWorkspace:async(workspaceId,channelName)=>{
    const workspace = await Workspace.findById(workspaceId).populate('channels')

      if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    
    const isChannelAlreadyPartOfWorkspace=workspace.channels.find((channel)=>channel.name===channelName)
    if (isChannelAlreadyPartOfWorkspace){
        throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }
    const channel=await channelRepo.create({name:channelName})
    workspace.channels.push(channel)
    await workspace.save()

    return workspace

  },

  fetchAllWorkspaceByMemberId:async(memberId)=>{
   const workspace=await Workspace.find({
    "members.memberId":memberId
   }).populate('members.memberId','username email avatar')
   return workspace
  }

};
