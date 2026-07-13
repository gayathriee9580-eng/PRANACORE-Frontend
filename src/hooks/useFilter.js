import { useMemo } from "react";

/**
 * Custom React hook to filter a dataset based on active filter rules.
 * Supports logical AND across multiple criteria and nested object properties.
 *
 * @template T
 * @param {T[]} data - The dataset to filter.
 * @param {Object.<string, any>} filters - Filter rules key-value map.
 * @returns {T[]} The filtered dataset.
 */
const useFilter = (data, filters) => {
  // Serialize filters object to prevent redundant filtering when criteria are declared inline
  const serializedFilters = useMemo(() => JSON.stringify(filters || {}), [filters]);

  return useMemo(() => {
    if (!Array.isArray(data)) return [];

    const activeFilters = JSON.parse(serializedFilters);

    // Identify active filter criteria, excluding keys with ignored values ("", null, undefined, "All")
    const criteria = Object.entries(activeFilters)
      .filter(([_, val]) => {
        if (val === null || val === undefined) return false;
        const strVal = String(val).trim();
        return strVal !== "" && strVal !== "All";
      })
      .map(([key, val]) => ({
        key,
        expectedValue: String(val).trim().toLowerCase(),
      }));

    if (criteria.length === 0) {
      return data;
    }

    return data.filter((item) => {
      if (!item) return false;

      // Every active filter must match (logical AND)
      return criteria.every(({ key, expectedValue }) => {
        let value;

        // Support nested object keys using dot notation
        if (key.includes(".")) {
          value = key.split(".").reduce((obj, prop) => obj?.[prop], item);
        } else {
          value = item[key];
        }

        // Ignore null and undefined object values safely (does not match active criteria)
        if (value === null || value === undefined) {
          return false;
        }

        // Perform case-insensitive, trimmed comparison
        return String(value).trim().toLowerCase() === expectedValue;
      });
    });
  }, [data, serializedFilters]);
};

export default useFilter;
