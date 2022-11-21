import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/lib";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("organization data");

        const user = await usersCollection.find({ email: credentials.email });
        // const isValid = await verifyPassword(
        //   credentials.password,
        //   user.password
        // );
        if (!user) {
          client.close();
          throw new Error("user does not exist");
        }

        client.close();
        return { email: user.email, password: password };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "test@email.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         const client = await connectToDatabase();
//         const usersCollection = client.db().collection("organization data");

//         const user = await usersCollection.find({ email: credentials.email });

//         if (!user) {
//           client.close();
//           throw new Error("No user found");
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           client.close();
//           throw new Error("invalid credentials");
//         }

//         client.close();
//         return { email: user.email };
//       },
//     }),
//   ],
// });
