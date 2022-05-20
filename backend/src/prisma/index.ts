import { PrismaClient } from "@prisma/client";

// const prismaClient = new PrismaClient()

const prismaClient = new PrismaClient({
  log: ['query']  // mostra o log no terminal
})

export { prismaClient }