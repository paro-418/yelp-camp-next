import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import UserModel from '../../../Models/UserModel';
import connectToDatabase from '../../../lib/connectToDatabase';
import mongoose from 'mongoose';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/account/login',
  },

  secret: 'H(iATfp%PtPC7Wybf5xGtfWNKhXb%wKToQyfh3&X0t&ug8ddi5JtGdelGTWC$2t%',

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        // do not need to pass anything here since i'm using my own sign in page
      },
      async authorize(credentials) {
        connectToDatabase(mongoose.connection.readyState);
        // console.log('CREDENTIALS RECEIVED', credentials);

        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username & Password required');
        }

        const userInfo = await UserModel.findOne({
          username: credentials.username,
        });
        // console.log(`FOUNDED USER`, userInfo);

        if (!userInfo) {
          throw new Error(`No userInfo found with this username`);
        }

        // console.log('comparing passwords');
        const isCorrectPassword = await compare(
          credentials.password,
          userInfo.password
        );

        // console.log(`CORRECT PASSWORD`, isCorrectPassword);

        if (!isCorrectPassword) {
          throw new Error(`Incorrect email or password`);
        }

        return {
          name: userInfo,
        };
      },
    }),
  ],
});
