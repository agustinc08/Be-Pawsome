import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers:
    // Configure one or more authentication providers
    [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          mail: {
            label: "Mail",
            type: "email",
            placeholder: "sumail@gmail.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(`${apiUrl}/usuarios/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mail: credentials?.mail,
              password: credentials?.password,
            }),
          });
          const user = await res.json();


          if (res.ok && user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        },
      }),
    ],
  callbacks: {
    async jwt({ token, user, session , trigger }) {

      if (session && trigger === "update") {
        token.userLogueado = session.userLogueado
      }

      if(user){
        return {
          ...token,
          ...user
        }
      }
      return token
    },
    async session({ session, token, user }) {
      return {...session,user:{
        ...session.user,
        ...token
      }}
    },
    secret: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: "/signIn",
  },

});

export { handler as GET, handler as POST };
