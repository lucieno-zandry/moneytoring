import useIntersectionObserver from "./useIntersectionObserver";

const options = {
  rootMargin: `0px 0px -${window.innerHeight - 1}px 0px`,
};

export default function <T extends HTMLElement>() {
  const observer = useIntersectionObserver<T>(options);
  return observer;
}
