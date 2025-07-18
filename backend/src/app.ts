import './config/passport';
import cookieParser from 'cookie-parser';
import express from 'express';
import { authRoutes } from './features/auth/auth.route';
import passport from 'passport';
import cors from 'cors';
import env from './config/env';
import { accountRoutes } from './features/account/account.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

export default app;
