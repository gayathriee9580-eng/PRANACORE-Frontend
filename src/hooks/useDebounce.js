import { useState, useEffect } from "react";

/**
 * Custom React hook to debounce any value (primitive or object).
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - The delay in milliseconds before updating the debounced value.
 * @returns {T} The debounced value.
 *
 * @example
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 500);
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: resets the timer when value or delay changes, and cleans up when the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
