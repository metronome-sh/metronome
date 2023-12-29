export function waitFor<T>(ms: number, cb?: () => T): Promise<T | void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (cb) {
        resolve(cb());
      } else {
        resolve();
      }
    }, ms);
  });
}
