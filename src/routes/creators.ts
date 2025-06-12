import { Elysia, t } from 'elysia'
import { 
  getCreators, 
  getCreator, 
  createNewCreator, 
  updateExistingCreator, 
  deleteExistingCreator, 
  getCreatorGames 
} from '../controllers/creatorController'

export const creatorsRoutes = new Elysia({ prefix: '/creators' })
  // GET /api/creators
  .get('/', async () => {
    return await getCreators()
  })
  
  // GET /api/creators/:id
  .get('/:id', async ({ params }) => {
    return await getCreator(params.id)
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  
  // POST /api/creators
  .post('/', async ({ body }) => {
    return await createNewCreator(body)
  }, {
    body: t.Object({
      first_name: t.String({ minLength: 1 }),
      last_name: t.String({ minLength: 1 }),
      email: t.String({ format: 'email' })
    })
  })
  
  // PUT /api/creators/:id
  .put('/:id', async ({ params, body }) => {
    return await updateExistingCreator(params.id, body)
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      first_name: t.Optional(t.String({ minLength: 1 })),
      last_name: t.Optional(t.String({ minLength: 1 })),
      email: t.Optional(t.String({ format: 'email' }))
    })
  })
  
  // DELETE /api/creators/:id
  .delete('/:id', async ({ params }) => {
    return await deleteExistingCreator(params.id)
  }, {
    params: t.Object({
      id: t.String()
    })
  })
  
  // GET /api/creators/:id/games
  .get('/:id/games', async ({ params }) => {
    return await getCreatorGames(params.id)
  }, {
    params: t.Object({
      id: t.String()
    })
  })