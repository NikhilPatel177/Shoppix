import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from './env';
import UserModel, { IUser } from '@/shared/models/user.model';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExists = await UserModel.findOne({
          googleProviderId: profile.id,
        });

        if (userExists) {
          return done(null, userExists);
        }

        const newUser = await UserModel.create({
          email: profile.emails?.[0].value,
          googleProviderId: profile.id,
          isEmailVerified: true,
          avatar: profile.photos?.[0].value,
        });

        done(null, newUser);
      } catch (error) {
        done(error as any, false);
      }
    }
  )
);
