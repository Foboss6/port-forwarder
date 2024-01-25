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
// const boo: DefaultServicesObject = {
//   dmp: [
//     { name: "svc/dmp-asp-companies-bff", localPort: 3100, clusterPort: 3000 },
//     { name: "svc/dmp-asp-members-bff", localPort: 3100, clusterPort: 3000 },
//     { name: "svc/dmp-asp-skills-catalog-bff", localPort: 3100, clusterPort: 3000 },
//   ],
// };
export const appConfig = new AppConfig();
