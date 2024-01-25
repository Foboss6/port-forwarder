import { execSync } from "child_process";
import { Logger } from "../services";

export class SessionCredentials {
  private logger = new Logger("SessionCredentials");
  private creds: string | undefined;
  public status: "ok" | "fail" | undefined;

  get() {
    return this.creds;
  }

  set(creds: string) {
    if (!this.checkCreds(creds)) {
      this.status = "fail";
      return false;
    }

    this.creds = creds;
    this.status = "ok";
    return true;
  }

  checkCreds(creds: string) {
    try {
      const result = execSync(
        `${creds} && aws eks --region eu-west-1 update-kubeconfig --name cx-test-eu-west-1-eks`
      ).toString();

      return /Updated context/.test(result);
    } catch (error) {
      this.logger.error(error instanceof Error ? error.message : JSON.stringify(error));
      return false;
    }
  }

  constructor(creds?: string) {
    if (creds) this.set(creds);
  }
}
