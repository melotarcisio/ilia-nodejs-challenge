class EnvironmentVariables {
  public DEBUG = process.env.DEBUG === "true";
  public PORT = process.env.WALLET_SERVICE_PORT || 3000;
}

export const env = new EnvironmentVariables();
