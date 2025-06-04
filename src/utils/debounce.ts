export function debounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
