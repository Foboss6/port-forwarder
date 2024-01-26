import { spawn } from "child_process";
import { appConfig } from "../config";
import { Logger } from "../shared";
import type { DefaultServicesObject } from "../shared/types";

export class PortForwarderService {
  private logger = new Logger();

  constructor() {
    if (appConfig.defaultServices) this.forwardDefaultServices(appConfig.defaultServices);
  }

  private forwardDefaultServices(defaultServices: DefaultServicesObject) {
    this.logger.log(`Forwarding the default services.`, `PortForwarderService.forwardDefaultServices`);

    for (const [namespace, services] of Object.entries(defaultServices)) {
      services.forEach(({ name, localPort, clusterPort }) => {
        this.forwardService(namespace, name, localPort, clusterPort);
      });
    }
  }

  forwardService(namespace: string, serviceName: string, localPort: number, clusterPort: number) {
    const logContext = `PortForwarderService.forwardService -> service: ${serviceName}`;

    this.logger.log(`Forwarding ${serviceName} ${clusterPort} -> ${localPort}`, logContext);
    const creds = appConfig.sessionCredentials.get();
    // console.log(
    //   `${creds ? `${creds} && ` : ""}kubectl -n ${namespace} port-forward ${serviceName} ${localPort}:${clusterPort}`
    // );

    const forwardingProcess = spawn(
      `${
        creds ? `${creds} && ` : ""
      }echo $AWS_ACCESS_KEY_ID && kubectl version && kubectl -n ${namespace} port-forward ${serviceName} ${localPort}:${clusterPort}`,
      { shell: true }
    );

    forwardingProcess.once("spawn", () => this.logger.debug(`Successfully spawned process.`, logContext));
    forwardingProcess.once("error", (err) =>
      this.logger.error(`Error during spawning process: ${err.message}`, logContext)
    );
    forwardingProcess.once("close", (code) => this.logger.log(`Closed spawned process with code: ${code}`, logContext));

    // TODO: check this
    forwardingProcess.stdout.on("data", (data) => console.log(data.toString()));
    forwardingProcess.stdout.on("error", (error) => console.error(error.message));
    forwardingProcess.stderr.on("data", (data) => console.error(data.toString()));
    forwardingProcess.stderr.on("error", (error) => console.error(error.message));
  }
}
