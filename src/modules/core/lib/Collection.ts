type AdvanceFilterKey<T> = keyof T | (keyof T)[] | ((item: T) => string);

export class Collection<T> extends Array<T> {
  declare ["constructor"]: typeof this;
  /**
   * Groups the collection by a given key or function.
   * @returns A grouped collection of the same type as `this`
   */
  groupBy<K extends keyof T>(
    keyOrMethod: K | ((item: T) => string)
  ): Record<string, this> {
    return this.reduce((acc, item) => {
      const groupKey =
        typeof keyOrMethod === "function"
          ? keyOrMethod(item)
          : (item[keyOrMethod] as unknown as string);
      if (!acc[groupKey]) {
        acc[groupKey] = this.createInstance();
      }

      acc[groupKey].push(item);
      return acc;
    }, {} as Record<string, this>);
  }

  /**
   * Normalizes a string by removing accents and converting to lowercase.
   */
  private normalizeString(str: string): string {
    return str
      .normalize("NFD") // Decomposes accented characters
      .replace(/\p{Diacritic}/gu, "") // Removes diacritical marks (accents)
      .toLowerCase(); // Converts to lowercase
  }

  /**
   * Extracts a set of normalized words from a given text.
   */
  private getNormalizedWords(text: string): Set<string> {
    return new Set(this.normalizeString(text).split(/\s+/));
  }

  /**
   * Filters the collection based on a search query.
   * Overloads:
   * - advancedFilter(query): searches in all fields.
   * - advancedFilter(keys, query): searches in specific fields or custom function.
   * @returns A filtered collection of the same type as `this`
   */
  advancedFilter(query: string): Collection<T>;
  advancedFilter(keys: AdvanceFilterKey<T>, query: string): Collection<T>;
  advancedFilter(
    keysOrQuery: AdvanceFilterKey<T> | string,
    query?: string
  ): this {
    let keys: AdvanceFilterKey<T>;
    if (typeof query === "undefined") {
      query = keysOrQuery as string;
      keys = (item: T) => Object.values(item as keyof T).join(" "); // Search in all fields
    } else {
      keys = keysOrQuery as AdvanceFilterKey<T>;
    }

    if (!query.trim()) return this.createInstance(...this);

    const queryWords = this.getNormalizedWords(query);

    return this.createInstance(
      ...this.filter((item) => {
        let text: string;

        if (typeof keys === "function") {
          text = keys(item);
        } else if (Array.isArray(keys)) {
          text = keys.map((key) => item[key]).join(" ");
        } else {
          text = item[keys] as any;
        }

        if (typeof text !== "string") return false;

        const textWords = this.getNormalizedWords(text);

        return [...queryWords].every((qWord) =>
          [...textWords].some((tWord) => tWord.includes(qWord))
        );
      })
    );
  }

  private createInstance(...data: T[]): this {
    return new (this as any).constructor(...data);
  }
}
