export default function (callback: (...args: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: any[]) {
    const context = this;

    clearTimeout(timer);

    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}
