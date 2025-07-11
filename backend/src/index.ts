import env from './config/env';
import http from 'http';
import app from './app';
import { connectDb } from './config/db';

const server = http.createServer(app);
const PORT = env.PORT;

(async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT} ✅`);
    });
  } catch (error) {
    console.log('Server listening error ❌:', error);
    process.exit(1);
  }
})();
