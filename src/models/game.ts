import sql from '../config/database'
import { Game, GameWithCreator, CreateGameRequest, UpdateGameRequest } from '../types'

export const findAllGames = async (): Promise<Game[]> => {
  const games = await sql<Game[]>`
    SELECT * FROM games ORDER BY created_at DESC
  `
  return games
}

export const findGameById = async (id: string): Promise<Game | null> => {
  const [game] = await sql<Game[]>`
    SELECT * FROM games WHERE id = ${id}
  `
  return game || null
}

export const findGameByIdWithCreator = async (id: string): Promise<GameWithCreator | null> => {
  const [result] = await sql<any[]>`
    SELECT 
      g.*,
      json_build_object(
        'id', c.id,
        'first_name', c.first_name,
        'last_name', c.last_name,
        'email', c.email,
        'created_at', c.created_at,
        'updated_at', c.updated_at
      ) as creator
    FROM games g
    JOIN creators c ON g.creator_id = c.id
    WHERE g.id = ${id}
  `
  return result || null
}

export const createGame = async (data: CreateGameRequest): Promise<Game> => {
  const [game] = await sql<Game[]>`
    INSERT INTO games (name, description, genre, creator_id)
    VALUES (${data.name}, ${data.description}, ${data.genre}, ${data.creator_id})
    RETURNING *
  `
  return game
}

export const updateGame = async (id: string, data: UpdateGameRequest): Promise<Game | null> => {
  const updateFields = []
  const values = []
  
  if (data.name !== undefined) {
    updateFields.push('name = $' + (values.length + 2))
    values.push(data.name)
  }
  if (data.description !== undefined) {
    updateFields.push('description = $' + (values.length + 2))
    values.push(data.description)
  }
  if (data.genre !== undefined) {
    updateFields.push('genre = $' + (values.length + 2))
    values.push(data.genre)
  }
  if (data.creator_id !== undefined) {
    updateFields.push('creator_id = $' + (values.length + 2))
    values.push(data.creator_id)
  }
  
  if (updateFields.length === 0) {
    return findGameById(id)
  }
  
  updateFields.push('updated_at = NOW()')
  
  const [game] = await sql<Game[]>`
    UPDATE games 
    SET ${sql(updateFields.join(', '))}
    WHERE id = ${id}
    RETURNING *
  `
  return game || null
}

export const deleteGame = async (id: string): Promise<boolean> => {
  const result = await sql`
    DELETE FROM games WHERE id = ${id}
  `
  return result.count > 0
}