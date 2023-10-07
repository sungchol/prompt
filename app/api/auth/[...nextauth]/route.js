// 구글인증
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import connectDB from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_PW,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      console.log("session in Router: ", session);
      console.log("sessionUser in Router: ", sessionUser);
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless ==> lambda -> dynamodb
        // connect to Mongodb
        await connectDB();
        console.log("connecting to Mongodb in router: ");
        console.log("signIn:profile /// ", profile);
        //check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
