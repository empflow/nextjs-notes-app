export default function hasAccessTokenExpired(errRespData: any) {
  const { errCode } = errRespData;
  if (errCode === "NO_ACCESS_TOKEN" || errCode === "INVALID_ACCESS_TOKEN") {
    return true;
  }
  return false;
}
