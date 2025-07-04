import cookieParser from 'cookie-parser';
import express from 'express';
import { AuthModule } from './modules/auth/auth.module';
import passport from 'passport';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize())


// Routes
router.use(AuthModule.route, AuthModule.router);

app.use('/api', router);

export default app;
