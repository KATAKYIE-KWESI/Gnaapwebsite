'use client';

import { useEffect, useRef } from 'react';

/**
 * useAnimateOnScroll
 * Adds `.is-visible` to all `.animate-on-scroll` elements inside the ref
 * when they enter the viewport.
 *
 * Usage:
 *   const ref = useAnimateOnScroll();
 *   <section ref={ref}><div className="animate-on-scroll delay-100">...</div></section>
 */
export function useAnimateOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = ref.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
