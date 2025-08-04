import { v4 as uuidv4 } from 'uuid';

import { workspaceRepo } from '../repositories/workspaceRepository.js';

export const WorkspaceService = async (workspaceData) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase()

    const response = await workspaceRepo.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    });

    await workspaceRepo.addMembersToWorkspace(
      response._id,
      workspaceData.owner,
      'admin'
    );

    const updatedWorkspace = await workspaceRepo.addChannelToWorkspace(
      response._id,
      'member'
    );

    return updatedWorkspace;
  } catch (error) {
    console.log('Eroor in workspaceservice', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        { error: { email: 'A workspace with same details already exists' } },
        'A workspace with same details already exists'
      );
    }
    throw error;
  }
};
