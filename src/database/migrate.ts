import sql from '../config/database'

async function migrate() {
  try {
    console.log('Running migrations...')
    
    // Create creators table
    await sql`
      CREATE TABLE IF NOT EXISTS creators (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
    
    // Create games table
    await sql`
      CREATE TABLE IF NOT EXISTS games (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        genre VARCHAR NOT NULL,
        creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
    
    console.log('Migrations completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await sql.end()
  }
}

migrate()