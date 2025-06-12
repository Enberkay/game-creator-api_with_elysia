
import postgres from 'postgres'

const sql = postgres({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'game_creator_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mypassword',

})

export default sql