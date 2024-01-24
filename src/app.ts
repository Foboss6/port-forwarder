import * as express from "express";
import { join } from "path";
import { appConfig } from "./config";
import { router } from "./routes";

import type { Request, Response } from "express";

const app: express.Express = express();

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(join(__dirname, "public")));
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// routing
app.use("/", router);

app.listen(appConfig.port, () => {
  console.log(`[server]: Server is running at http://localhost:${appConfig.port}`);
});
