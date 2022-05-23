import { Request, Response, Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/multer'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { AddItemController } from './controllers/order/AddItemController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'
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

router.get('/categories/products', isAuthenticated, new ListByCategoryController().handle)

// -- ROTAS ORDER --
router.post('/orders', isAuthenticated, new CreateOrderController().handle)
router.delete('/orders', isAuthenticated, new RemoveOrderController().handle)
router.post('/orders/add', isAuthenticated, new AddItemController().handle)


export { router }
