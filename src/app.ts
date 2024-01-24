import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Root page");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
