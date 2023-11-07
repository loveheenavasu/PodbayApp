import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({   
    providers: [
      CredentialsProvider({
        name: 'Credentials',

        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const res = await fetch("/your/endpoint", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          const user = await res.json()
    
          if (res.ok && user) {
            return user
          }
          return null
        }
      })
    ],
//   pages: {
//     signIn: '/auth/signin',
//   },
//   session: {
//     jwt: true,
//   },
  callbacks: {
    async session({ session, user }) {
        if (session?.user) {
            session.user.id = user.id;
            session.user.role = user.role;
        }
    
        return session;
    }
  },
})
