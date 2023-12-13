class EnvironmentVariables {
  public DEBUG = process.env.DEBUG === "true";
  public PORT = process.env.WALLET_SERVICE_PORT || 3000;

  public INTERNAL_PRIVATE_KEY = process.env.INTERNAL_PRIVATE_KEY || "";
  public EXTERNAL_PRIVATE_KEY = process.env.EXTERNAL_PRIVATE_KEY || "";
  public USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || "";
}

export const env = new EnvironmentVariables();
