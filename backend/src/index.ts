import { env } from '@config/env';
import { connectDb } from '@config/db';
import * as http from 'http';
import app from './app';

const server = http.createServer(app);

(async function () {
  try {
    await connectDb();

    server.listen(env.PORT, () => {
      console.log('✅ Server listening on port', env.PORT);
    });
  } catch (error) {
    console.log('❌ Server listening error :-', error);
    process.exit(1);
  }
})();
