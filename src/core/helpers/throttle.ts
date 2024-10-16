let timeout: NodeJS.Timeout | null;

export default (callback: () => void, delay: number = 100) => {
  if (timeout) return;
  callback();
  timeout = setTimeout(() => {
    timeout = null;
  }, delay);
};
