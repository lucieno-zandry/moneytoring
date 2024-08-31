import React from "react";

const defaultOptions: IntersectionObserverInit = {
  threshold: 1,
};

const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit = defaultOptions
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref: React.LegacyRef<T> = React.createRef();

  const callback: IntersectionObserverCallback = React.useCallback((entries) => {
    entries.forEach((entry) => {
      const threshold = options.threshold as number;

      setIsIntersecting(
        entry.isIntersecting && entry.intersectionRatio >= threshold
      );
    });
  }, [options.threshold]);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options, callback]);

  return { ref, isIntersecting };
};

export default useIntersectionObserver;
