import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string
    console.log(order_id)

    const detailOrder = new DetailOrderService()

    const orders = await detailOrder.execute({ order_id })

    return res.json(orders)
  }
}

export { DetailOrderController }