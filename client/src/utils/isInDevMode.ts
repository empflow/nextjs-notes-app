export default function isInDevMode() {
  return process.env.NODE_ENV === "development";
}
