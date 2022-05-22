import { Request, Response, Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/multer'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()

const upload = multer(uploadConfig.upload("./temp"))

router.get('/', (req: Request, res: Response) => {
  return res.send(`
    <h1 style='font-family: sans-serif'>
        API Pizzaria!!! 🍕
    <h1>
  `)
})

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/users/me', isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY --
router.post('/categories', isAuthenticated, new CreateCategoryController().handle)
router.get('/categories', isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT --
router.post('/products',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
)

export { router }
