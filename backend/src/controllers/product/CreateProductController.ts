import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body
    const valor = parseFloat(price)

    if (!req.file) {
      // throw new Error("error upload file")
    } else {

      const { filename } = req.file

      const createProductService = new CreateProductService()

      const product = await createProductService.execute({
        name,
        price: valor,
        description,
        banner: filename,
        category_id
      })

      return res.json(product)
    }
  }
}

export { CreateProductController }