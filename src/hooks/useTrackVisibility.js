import { useEffect, useRef } from "react";
import { trackSectionView } from "../utils/analytics";

/**
 * Fires a `section_view` analytics event once when 25 % of the element is visible.
 * Returns a ref — attach it to the outermost <section> / <footer>.
 *
 * Usage:
 *   const trackRef = useTrackVisibility("hero");
 *   <section ref={trackRef}> … </section>
 */
export default function useTrackVisibility(sectionName) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(sectionName);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}
