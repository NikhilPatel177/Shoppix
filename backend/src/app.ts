import cookieParser from 'cookie-parser';
import express from 'express';
import { authRoutes } from './features/auth/auth.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

export default app;
