import { hash, genSalt } from 'bcryptjs'
import { prismaClient } from "../../prisma"

interface UserRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {

    if (!email) {
      throw new Error("E-mail incorreto")
    }
    if (!name) {
      throw new Error("Nome não informado")
    }
    if (!password) {
      throw new Error("Senha não informada")
    }

    const userExists = await prismaClient.user.findFirst({
      where: { email: email }
    })

    if (userExists) {
      throw new Error("Usuário já cadastrado")
    }

    const salt = await genSalt(8)
    const hashedPassword = await hash(password, salt)

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user
  }
}

export { CreateUserService }