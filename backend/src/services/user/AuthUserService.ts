import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prismaClient } from "../../prisma"

interface AuthRequest {
  email: string
  password: string
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {

    // verifica se o usuário existe

    const user = await prismaClient.user.findFirst({
      where: { email }
    })

    if (!user) {
      throw new Error("Usuário ou senha incorreta")
    }

    // verifica se a senha está correta

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorreta")
    }

    // gera um token JWT

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    }
  }
}

export { AuthUserService }