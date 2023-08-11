export default function hasRefreshTokenExpired(errRespData: any) {
  const { errCode } = errRespData;
  if (errCode === "NO_REFRESH_TOKEN" || errCode === "INVALID_REFRESH_TOKEN") {
    return true;
  }
  return false;
}
