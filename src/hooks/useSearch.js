import { useMemo } from "react";

/**
 * Custom React hook to filter a dataset based on a search term across multiple object keys.
 * Supports one-level nested object paths (e.g., "address.city").
 *
 * @template T
 * @param {T[]} data - Array of objects to search through.
 * @param {string} searchTerm - The search query string.
 * @param {string[]} searchKeys - Array of object keys to match the query against.
 * @returns {T[]} The filtered array of objects.
 */
const useSearch = (data, searchTerm, searchKeys) => {
  // Serialize searchKeys to prevent redundant runs when key arrays are declared inline
  const serializedKeys = useMemo(() => JSON.stringify(searchKeys), [searchKeys]);

  return useMemo(() => {
    if (!Array.isArray(data)) return [];

    const query = (searchTerm || "").trim().toLowerCase();
    if (!query) {
      return data;
    }

    const keys = JSON.parse(serializedKeys);

    return data.filter((item) => {
      if (!item) return false;

      return keys.some((key) => {
        let value;

        // Support nested values one level deep
        if (key.includes(".")) {
          const [parent, child] = key.split(".");
          value = item[parent]?.[child];
        } else {
          value = item[key];
        }

        // Ignore null and undefined values
        if (value === null || value === undefined) {
          return false;
        }

        // Perform case-insensitive search
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [data, searchTerm, serializedKeys]);
};

export default useSearch;
