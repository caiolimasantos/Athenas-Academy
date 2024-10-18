import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByUser } from './queries';

export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth({
  pages:{
    signIn: '/',
    error: '/'
  },
  providers: [Credentials({
    credentials: {
      username: {},
      password: {}
    },
    async authorize(credentials) {
      if (!credentials) {
        return null
      }

      const codigo_escola = String(process.env.CODIGO_ESCOLA);
      const type = 'AL';

      const login: any = await getUserByUser(String(credentials.username), codigo_escola, type)

      if (!login || !login[0]) {
        return null
      }
      const yearPassword = new Date(login[0].data_nascimento).getFullYear().toString();

      if (String(credentials.username) === login[0].matricula && String(credentials.password) === yearPassword && type === 'AL' && login[0].situacao === 'A') {
        const userData = {
          id: login[0].id_aluno,
          name: login[0].nome,
          email: login[0].email
        }
        return userData;
      }
      return null
    }
  })],
  callbacks: {
    jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token
    },
    session({session, token}){
      session.user.id = token.id
      return session
    }
  }
});