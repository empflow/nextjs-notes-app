export default function convertAccessTokenToAuthHeader(accessToken: string) {
  return `Bearer ${accessToken}`;
}
