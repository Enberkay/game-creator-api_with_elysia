import { Elysia } from 'elysia'
import { creatorsRoutes } from './routes/creators'
import { gamesRoutes } from './routes/games'

const app = new Elysia({ prefix: '/api' })
  .use(creatorsRoutes)
  .use(gamesRoutes)
  .get('/', () => ({
    message: 'Game Creator API is running!',
    version: '1.0.0',
    endpoints: {
      creators: {
        'GET /api/creators': 'Get all creators',
        'GET /api/creators/:id': 'Get creator by ID',
        'POST /api/creators': 'Create new creator',
        'PUT /api/creators/:id': 'Update creator',
        'DELETE /api/creators/:id': 'Delete creator',
        'GET /api/creators/:id/games': 'Get creator games'
      },
      games: {
        'GET /api/games': 'Get all games',
        'GET /api/games/:id': 'Get game by ID',
        'GET /api/games/:id/with-creator': 'Get game with creator info',
        'POST /api/games': 'Create new game',
        'PUT /api/games/:id': 'Update game',
        'DELETE /api/games/:id': 'Delete game'
      }
    }
  }))
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)