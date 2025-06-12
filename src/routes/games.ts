import { Elysia, t } from 'elysia'
import { 
  getGames, 
  getGame, 
  getGameWithCreator, 
  createNewGame, 
  updateExistingGame, 
  deleteExistingGame 
} from '../controllers/gameController'

export const gamesRoutes = new Elysia({ prefix: '/games' })
  // GET /api/games
  .get('/', async () => {
    return await getGames()
  })
  
  // GET /api/games/:id
  .get('/:id', async ({ params }) => {
    return await getGame(params.id)
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  
  // GET /api/games/:id/with-creator
  .get('/:id/with-creator', async ({ params }) => {
    return await getGameWithCreator(params.id)
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  
  // POST /api/games
  .post('/', async ({ body }) => {
    return await createNewGame(body)
  }, {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      description: t.String({ minLength: 1 }),
      genre: t.String({ minLength: 1 }),
      creator_id: t.String()
    })
  })
  
  // PUT /api/games/:id
  .put('/:id', async ({ params, body }) => {
    return await updateExistingGame(params.id, body)
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1 })),
      description: t.Optional(t.String({ minLength: 1 })),
      genre: t.Optional(t.String({ minLength: 1 })),
      creator_id: t.Optional(t.String())
    })
  })
  
  // DELETE /api/games/:id
  .delete('/:id', async ({ params }) => {
    return await deleteExistingGame(params.id)
  }, {
    params: t.Object({
      id: t.String()
    })
  })