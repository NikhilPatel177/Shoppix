import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from './env';
import { UserModel } from '../shared/models/user.model';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
      try {
        let user = await UserModel.findOne({ providerId: profile.id });

        if (!user) {
          const nameParts = profile.displayName?.split(' ') ?? [
            'Google',
            'User',
          ];
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ') || 'User';

          user = await UserModel.create({
            providerId: profile.id,
            email: profile.emails?.[0].value,
            fullName: { firstName, lastName },
            provider: ['credentials', 'google'],
            profileImg: profile.photos?.[0].value,
            isVerified: true,
            verifiedAt: new Date(),
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, false);
      }
    }
  )
);
