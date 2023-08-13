export default function isValidHexColor(color: string) {
  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  return hexColorRegex.test(color);
}
