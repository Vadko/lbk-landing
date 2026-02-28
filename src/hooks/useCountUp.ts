import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number; // тривалість анімації в мілісекундах
  start?: number;
  decimals?: number;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Відслідковуємо видимість елемента
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Запускаємо коли 10% елемента видно
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  // Анімація запускається тільки коли елемент видимий
  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Використовуємо ease-out функцію для плавної анімації
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOutQuad;

      setCount(current);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, start, isVisible]);

  return {
    value: decimals > 0 ? count.toFixed(decimals) : Math.floor(count),
    ref,
  };
}
