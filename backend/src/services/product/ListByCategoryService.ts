import { prismaClient } from "../../prisma"

interface ProductRequest {
  category_id: string
}

class ListByCategoryService {
  async execute({ category_id }: ProductRequest) {

    const products = await prismaClient.product.findMany({
      where: {
        category_id
      }
    })

    return products
  }
}

export { ListByCategoryService }