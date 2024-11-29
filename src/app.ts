import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
(() => {
  main();
})();

function main() {
  const app = express();
  const controller = new GithubController();

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json("Server running");
  });

  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server runnin on port ${envs.PORT}!`);
  });
}
