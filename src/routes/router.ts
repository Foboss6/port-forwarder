import * as express from "express";
import { appConfig } from "./../config/config";

import type { Request, Response } from "express";

export const router = express.Router();

router.post("/session-creds", express.json(), (req: Request, res: Response) => {
  const { text: creds } = req.body;

  if (!creds) {
    res.status(400).json({ message: "Invalid request: Missing text in the request body." });
    return;
  }

  // check creds and set it to global storage
  appConfig.sessionCredentials.set(creds);

  res.json({ message: `Server received: ${1}` });
});
