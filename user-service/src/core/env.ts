class EnvironmentVariables {
  public DEBUG = process.env.DEBUG === "true";
  public PORT = process.env.USER_SERVICE_PORT || 3000;

  public INTERNAL_PRIVATE_KEY = process.env.INTERNAL_PRIVATE_KEY || "";
  public EXTERNAL_PRIVATE_KEY = process.env.EXTERNAL_PRIVATE_KEY || "";
}

export const env = new EnvironmentVariables();
