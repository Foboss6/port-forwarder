// import * as express from "express";
// import { join } from "path";
// import { appConfig } from "./config";
// import { router } from "./routes";
import { Logger } from "./shared";
import { PortForwarderService } from "./port-forwarder";

// import type { Request, Response } from "express";

const logger = new Logger("main");
// instantiating the PortForwarderService
logger.log(`Starting port-forwarder service...`);
const portForwarder = new PortForwarderService();
// portForwarder.forwardService("svc/dmp-asp-companies-bff", 3100);

// TODO: run server when it's functional is implemented
// const app: express.Express = express();

// // Serve static files (HTML, CSS, JavaScript)
// app.use(express.static(join(__dirname, "public")));
// app.get("/", (_req: Request, res: Response) => {
//   res.sendFile(join(__dirname, "public", "index.html"));
// });

// // routing
// app.use("/", router);

// app.listen(appConfig.port, () => {
//   logger.success(`Server is running at http://localhost:${appConfig.port}`);
// });
