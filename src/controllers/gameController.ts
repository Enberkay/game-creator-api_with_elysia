import { 
  findAllGames, 
  findGameById, 
  findGameByIdWithCreator, 
  createGame, 
  updateGame, 
  deleteGame 
} from '../models/game'
import { findCreatorById } from '../models/creator'
import { CreateGameRequest, UpdateGameRequest } from '../types'

export const getGames = async () => {
  try {
    const games = await findAllGames()
    return {
      success: true,
      data: games
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch games',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const getGame = async (id: string) => {
  try {
    const game = await findGameById(id)
    if (!game) {
      return {
        success: false,
        message: 'Game not found'
      }
    }
    return {
      success: true,
      data: game
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch game',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const getGameWithCreator = async (id: string) => {
  try {
    const game = await findGameByIdWithCreator(id)
    if (!game) {
      return {
        success: false,
        message: 'Game not found'
      }
    }
    return {
      success: true,
      data: game
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch game with creator',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const createNewGame = async (data: CreateGameRequest) => {
  try {
    // Check if creator exists
    const creator = await findCreatorById(data.creator_id)
    if (!creator) {
      return {
        success: false,
        message: 'Creator not found'
      }
    }

    const game = await createGame(data)
    return {
      success: true,
      data: game,
      message: 'Game created successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create game',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const updateExistingGame = async (id: string, data: UpdateGameRequest) => {
  try {
    // Check if creator exists when updating creator_id
    if (data.creator_id) {
      const creator = await findCreatorById(data.creator_id)
      if (!creator) {
        return {
          success: false,
          message: 'Creator not found'
        }
      }
    }

    const game = await updateGame(id, data)
    if (!game) {
      return {
        success: false,
        message: 'Game not found'
      }
    }
    return {
      success: true,
      data: game,
      message: 'Game updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update game',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const deleteExistingGame = async (id: string) => {
  try {
    const deleted = await deleteGame(id)
    if (!deleted) {
      return {
        success: false,
        message: 'Game not found'
      }
    }
    return {
      success: true,
      message: 'Game deleted successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete game',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}