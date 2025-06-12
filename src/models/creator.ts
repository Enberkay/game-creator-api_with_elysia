import sql from '../config/database'
import { Creator, CreateCreatorRequest, UpdateCreatorRequest } from '../types'

export const findAllCreators = async (): Promise<Creator[]> => {
  const creators = await sql<Creator[]>`
    SELECT * FROM creators ORDER BY created_at DESC
  `
  return creators
}

export const findCreatorById = async (id: string): Promise<Creator | null> => {
  const [creator] = await sql<Creator[]>`
    SELECT * FROM creators WHERE id = ${id}
  `
  return creator || null
}

export const createCreator = async (data: CreateCreatorRequest): Promise<Creator> => {
  const [creator] = await sql<Creator[]>`
    INSERT INTO creators (first_name, last_name, email)
    VALUES (${data.first_name}, ${data.last_name}, ${data.email})
    RETURNING *
  `
  return creator
}

export const updateCreator = async (id: string, data: UpdateCreatorRequest): Promise<Creator | null> => {
  const updateFields = []
  const values = []
  
  if (data.first_name !== undefined) {
    updateFields.push('first_name = $' + (values.length + 2))
    values.push(data.first_name)
  }
  if (data.last_name !== undefined) {
    updateFields.push('last_name = $' + (values.length + 2))
    values.push(data.last_name)
  }
  if (data.email !== undefined) {
    updateFields.push('email = $' + (values.length + 2))
    values.push(data.email)
  }
  
  if (updateFields.length === 0) {
    return findCreatorById(id)
  }
  
  updateFields.push('updated_at = NOW()')
  
  const [creator] = await sql<Creator[]>`
    UPDATE creators 
    SET ${sql(updateFields.join(', '))}
    WHERE id = ${id}
    RETURNING *
  `
  return creator || null
}

export const deleteCreator = async (id: string): Promise<boolean> => {
  const result = await sql`
    DELETE FROM creators WHERE id = ${id}
  `
  return result.count > 0
}

export const findCreatorGames = async (creatorId: string) => {
  const games = await sql`
    SELECT * FROM games WHERE creator_id = ${creatorId} ORDER BY created_at DESC
  `
  return games
}