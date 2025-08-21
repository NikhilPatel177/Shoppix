import express from 'express';
import { authRoutes } from '@features/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

export default app;
