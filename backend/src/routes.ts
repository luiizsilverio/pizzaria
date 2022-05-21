import { Request, Response, Router } from 'express'
import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API Pizzaria!!! 🍕
    <h1>
  `)
})

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

export { router }