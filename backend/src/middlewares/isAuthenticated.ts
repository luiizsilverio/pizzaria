import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  name: string
  email: string
  sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

  // receber o token no header de autenticação
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end()
  }

  const [_, token] = authToken.split(" ")

  // verifica se o token é válido

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload

    // injetar o id do usuário dentro do request
    req.user_id = sub
    console.log(sub)

    return next()

  } catch (error) {
    return res.status(403).json({ error: 'Invalid JWT Token' });
  }

}