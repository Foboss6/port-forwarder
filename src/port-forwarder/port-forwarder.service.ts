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

    const forwardingProcess = spawn(
      `${creds ? `${creds} && ` : ""}kubectl -n ${namespace} port-forward ${serviceName} ${localPort}:${clusterPort}`,
      { shell: true }
    );

    forwardingProcess.once("spawn", () => this.logger.debug(`Successfully spawned process.`, logContext));
    forwardingProcess.once("error", (err) =>
      this.logger.error(`Error during spawning process: ${err.message}`, logContext)
    );
    forwardingProcess.once("close", (code) => this.logger.log(`Closed spawned process with code: ${code}`, logContext));

    // TODO: check this
    forwardingProcess.stdout.on("data", (data) => this.logger.debug(data.toString(), logContext));
    forwardingProcess.stdout.on("error", (error) => this.logger.error(error.message, logContext));
  }
}
