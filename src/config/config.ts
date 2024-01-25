import * as dotenv from "dotenv";
import { SessionCredentials } from "../shared/dto/session-credentials.class";
import type { DefaultServicesObject } from "../shared/types";

dotenv.config();

class AppConfig {
  /** The PORT number for application running on. */
  port: number | string;
  /** The Cluster credentials storage. */
  sessionCredentials: SessionCredentials;

  defaultServices?: DefaultServicesObject;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.sessionCredentials = new SessionCredentials(process.env.SESSION_CREDENTIALS);
    this.defaultServices = process.env.DEFAULT_SERVICES_OBJECT
      ? JSON.parse(process.env.DEFAULT_SERVICES_OBJECT)
      : undefined;
  }
}

export const appConfig = new AppConfig();
