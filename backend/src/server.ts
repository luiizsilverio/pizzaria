import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import { router } from './routes'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.get('/test', (req: Request, res: Response) => {
    return res.send('Teste')
})

// Middleware que intercepta os erros
app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    console.error(err.message)
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333...')
})
