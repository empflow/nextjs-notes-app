export type TGetAuthDataReturnT = null | {
  username: string;
  refreshToken: string;
};

export default function getAuthDataGetReturnVal(
  username: string | null,
  refreshToken: string | null,
) {
  if (!username || !refreshToken) return null;
  return { username, refreshToken };
}
