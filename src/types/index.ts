export interface Creator {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface Game {
  id: string
  name: string
  description: string
  genre: string
  creator_id: string
  created_at: Date
  updated_at: Date
}

export interface GameWithCreator extends Game {
  creator: Creator
}

export interface CreateCreatorRequest {
  first_name: string
  last_name: string
  email: string
}

export interface UpdateCreatorRequest {
  first_name?: string
  last_name?: string
  email?: string
}

export interface CreateGameRequest {
  name: string
  description: string
  genre: string
  creator_id: string
}

export interface UpdateGameRequest {
  name?: string
  description?: string
  genre?: string
  creator_id?: string
}