export function onceRevealSection(selector: string, options?: IntersectionObserverInit) {
  if (typeof window === 'undefined') return;

  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;

  const obs = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      el.classList.add('is-visible');
      observer.disconnect();
    }
  }, { root: null, threshold: 0.15, ...options });

  obs.observe(el);
}
