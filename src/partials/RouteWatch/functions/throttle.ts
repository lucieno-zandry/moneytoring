let timeout: number;

export default (callback: () => void, delay: number = 100) => {
  if (timeout) return;
  callback();
  timeout = setTimeout(() => {
    timeout = 0;
  }, delay);
};
