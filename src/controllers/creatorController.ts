import { 
  findAllCreators, 
  findCreatorById, 
  createCreator, 
  updateCreator, 
  deleteCreator, 
  findCreatorGames 
} from '../models/creator'
import { CreateCreatorRequest, UpdateCreatorRequest } from '../types'

export const getCreators = async () => {
  try {
    const creators = await findAllCreators()
    return {
      success: true,
      data: creators
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch creators',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const getCreator = async (id: string) => {
  try {
    const creator = await findCreatorById(id)
    if (!creator) {
      return {
        success: false,
        message: 'Creator not found'
      }
    }
    return {
      success: true,
      data: creator
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch creator',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const createNewCreator = async (data: CreateCreatorRequest) => {
  try {
    const creator = await createCreator(data)
    return {
      success: true,
      data: creator,
      message: 'Creator created successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create creator',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const updateExistingCreator = async (id: string, data: UpdateCreatorRequest) => {
  try {
    const creator = await updateCreator(id, data)
    if (!creator) {
      return {
        success: false,
        message: 'Creator not found'
      }
    }
    return {
      success: true,
      data: creator,
      message: 'Creator updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update creator',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const deleteExistingCreator = async (id: string) => {
  try {
    const deleted = await deleteCreator(id)
    if (!deleted) {
      return {
        success: false,
        message: 'Creator not found'
      }
    }
    return {
      success: true,
      message: 'Creator deleted successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete creator',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const getCreatorGames = async (id: string) => {
  try {
    const creator = await findCreatorById(id)
    if (!creator) {
      return {
        success: false,
        message: 'Creator not found'
      }
    }
    
    const games = await findCreatorGames(id)
    return {
      success: true,
      data: games
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch creator games',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}