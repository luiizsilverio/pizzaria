import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id } = req.body
    const amount = req.body.amount as number

    const addItem = new AddItemService()

    const order = await addItem.execute({
      order_id,
      product_id,
      amount
    })

    return res.json(order)
  }
}

export { AddItemController }