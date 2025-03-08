export async function sleep(ms: number = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
