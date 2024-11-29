import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubMiddlewareSha256 } from './presentation/middlewares/github-sha256.middleware';

(() => {
  main();
})();

function main() {
  const app = express();
  const controller = new GithubController();

  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.json('Server running');
  });

  app.post('/api/github', GithubMiddlewareSha256.verifySignature, controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server runnin on port ${envs.PORT}!`);
  });
}
