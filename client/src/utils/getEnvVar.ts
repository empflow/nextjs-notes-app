export default function getEnvVar(envVarName: string) {
  const envVarVal = process.env[envVarName];
  if (envVarVal === undefined) {
    throw new Error(`${envVarName} environment variable not found`);
  }
  return envVarVal;
}
