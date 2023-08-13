import getEnvVar from "./getEnvVar";

export default function getNodeEnv() {
  return getEnvVar("NODE_ENV");
}
