export const delay = (fn: () => void, ms: number) => {
  setTimeout(fn, ms);
};
