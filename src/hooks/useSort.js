import { useMemo } from "react";

/**
 * Custom React hook to sort a dataset based on a sort configuration.
 * Supports strings, numbers, dates, and nested object keys using dot notation.
 * Always creates a shallow copy to prevent mutation of the original array.
 *
 * @template T
 * @param {T[]} data - Array of objects to sort.
 * @param {Object} sortConfig - Sort configuration.
 * @param {string} sortConfig.key - Object key or nested path (e.g., "hospital.name") to sort by.
 * @param {"asc" | "desc"} sortConfig.direction - Sort direction.
 * @returns {T[]} The sorted array of objects.
 */
const useSort = (data, sortConfig) => {
  // Serialize sortConfig to prevent redundant sorting passes when config is declared inline
  const serializedConfig = useMemo(() => JSON.stringify(sortConfig || {}), [sortConfig]);

  return useMemo(() => {
    if (!Array.isArray(data)) return [];

    const config = JSON.parse(serializedConfig);
    const { key, direction } = config;

    // Return original array if key is empty/null or direction is missing
    if (!key || !direction) {
      return data;
    }

    const getNestedValue = (obj, path) => {
      if (!obj || !path) return undefined;
      return path.split(".").reduce((acc, part) => acc?.[part], obj);
    };

    const isDate = (val) => {
      if (val instanceof Date) return true;
      if (typeof val !== "string") return false;
      if (!isNaN(Number(val))) return false;
      const timestamp = Date.parse(val);
      return !isNaN(timestamp);
    };

    // Shallow copy original array to prevent direct mutation
    const sorted = [...data];

    sorted.sort((itemA, itemB) => {
      const valA = getNestedValue(itemA, key);
      const valB = getNestedValue(itemB, key);

      const isAEmpty = valA === null || valA === undefined;
      const isBEmpty = valB === null || valB === undefined;

      if (isAEmpty && isBEmpty) return 0;
      if (isAEmpty) return 1; // Safe placement at the end
      if (isBEmpty) return -1;

      let a = valA;
      let b = valB;

      // Handle Dates
      if (isDate(a) && isDate(b)) {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
      }
      // Handle Strings
      else if (typeof a === "string" && typeof b === "string") {
        a = a.trim().toLowerCase();
        b = b.trim().toLowerCase();
      }
      // Handle Numbers (already values, no action needed)
      else if (typeof a === "number" && typeof b === "number") {
        // Keep values as numbers
      }
      // Fallback for other mixed types
      else {
        a = String(a).trim().toLowerCase();
        b = String(b).trim().toLowerCase();
      }

      if (a < b) return direction === "asc" ? -1 : 1;
      if (a > b) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, serializedConfig]);
};

export default useSort;
