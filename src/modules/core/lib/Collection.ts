type AdvanceFilterKey<T> = keyof T | (keyof T)[] | ((item: T) => string);

/**
 * Represents a generic collection of items with advanced grouping and filtering capabilities.
 *
 * @typeParam T - The type of items contained in the collection.
 */
export abstract class Collection<T> extends Array<T> {
  declare ["constructor"]: typeof Collection;

  /**
   * Groups the collection by a given key or function.
   * @returns A grouped collection of the same type as `this`
   */
  groupBy<K extends keyof T>(
    keyOrMethod: K | ((item: T) => string)
  ): Record<string, this> {
    return this.reduce((group, currentValue) => {
      const groupKey =
        typeof keyOrMethod === "function"
          ? keyOrMethod(currentValue)
          : String(currentValue[keyOrMethod]);
      if (!group[groupKey]) {
        group[groupKey] = this.createGroup();
      }
      group[groupKey].push(currentValue);
      return group;
    }, {} as Record<string, this>);
  }

  /**
   * Normalizes a string by removing accents and converting to lowercase.
   */
  protected normalizeString(str: string): string {
    return str
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  }

  /**
   * Extracts a set of normalized words from a given text.
   */
  protected getNormalizedWords(text: string): Set<string> {
    return new Set(this.normalizeString(text).split(/\s+/));
  }

  /**
   * Filters the collection based on a search query.
   * Overloads:
   * - advancedFilter(query): searches in all fields.
   * - advancedFilter(keys, query): searches in specific fields or custom function.
   * @returns A filtered collection of the same type as `this`
   */
  advancedFilter(query: string): this;
  advancedFilter(keys: AdvanceFilterKey<T>, query: string): this;
  advancedFilter(
    keysOrQuery: AdvanceFilterKey<T> | string,
    query?: string
  ): this {
    let keys: AdvanceFilterKey<T>;
    let actualQuery: string;

    if (typeof query === "undefined") {
      actualQuery = keysOrQuery as string;
      keys = (item: T) =>
        Object.values(item as Record<string, unknown>).join(" "); // Search in all fields
    } else {
      keys = keysOrQuery as AdvanceFilterKey<T>;
      actualQuery = query;
    }

    if (!actualQuery.trim()) return this.createGroup([...this]);

    const queryWords = this.getNormalizedWords(actualQuery);

    const filtered = this.filter((item) => {
      let text: string;

      if (typeof keys === "function") {
        text = keys(item);
      } else if (Array.isArray(keys)) {
        text = keys.map((key) => String(item[key] ?? "")).join(" ");
      } else {
        text = String(item[keys] ?? "");
      }

      if (typeof text !== "string") return false;

      const textWords = this.getNormalizedWords(text);

      return [...queryWords].every((qWord) =>
        [...textWords].some((tWord) => tWord.includes(qWord))
      );
    });

    return this.createGroup(filtered);
  }

  private createGroup = (array: Array<T> = []) =>
    Object.setPrototypeOf(array, this.constructor.prototype) as this;
}
