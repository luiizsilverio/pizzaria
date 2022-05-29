import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from "../services/errors/AuthTokenError";

// função para páginas que só usuários logados podem ter acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);
    const token = cookies['@pizza.token']

    // se alguém logado tentar acessar a página, redireciona
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)

    } catch(err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@pizza.token')
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}