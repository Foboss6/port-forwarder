import { execSync } from "child_process";

export class SessionCredentials {
  private creds: string;

  get() {
    return this.creds;
  }

  set(creds: string) {
    if (!this.checkCreds(creds)) return false;

    this.creds = creds;
    return true;
  }

  checkCreds(creds: string) {
    const result = execSync(
      `${creds} && aws eks --region eu-west-1 update-kubeconfig --name cx-test-eu-west-1-eks`
    ).toString();

    const checkRes = /Updated context/.test(result);
    if (!checkRes) console.log(`Wrong creds`); //!!!!

    return checkRes;
  }

  constructor(creds?: string) {
    this.creds = creds && this.checkCreds(creds) ? creds : "";
  }
}
