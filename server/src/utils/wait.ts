export default async function wait(timeMs: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeMs);
  });
}
