import { SessionCredentials } from "../shared/dto/session-credentials.class";
import * as dotenv from "dotenv";

dotenv.config();

class AppConfig {
  /** The PORT number for application running on. */
  port: number | string;
  /** The Cluster credentials storage. */
  sessionCredentials: SessionCredentials;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.sessionCredentials = new SessionCredentials(process.env.SESSION_CREDENTIALS);
  }
}

export const appConfig = new AppConfig();
