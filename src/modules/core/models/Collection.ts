export abstract class Collections<T> extends Array<T> {
  /**
   * Groups the elements of the collection by a specified key or a method.
   *
   * @template T - The type of elements in the collection.
   * @template K - The type of the key used for grouping.
   * @param keyOrMethod - A key of the elements or a function that returns the grouping key for each element.
   *                      If a key is provided, the elements are grouped by the value of that key.
   *                      If a function is provided, it is invoked for each element to determine the grouping key.
   * @returns A record where the keys are the grouping keys and the values are arrays of elements that belong to each group.
   *
   * @example
   * // Grouping by a key
   * const collection = new Collection([{ id: 1, type: 'A' }, { id: 2, type: 'B' }, { id: 3, type: 'A' }]);
   * const groupedByType = collection.groupBy('type');
   * // Result: { A: [{ id: 1, type: 'A' }, { id: 3, type: 'A' }], B: [{ id: 2, type: 'B' }] }
   *
   * @example
   * // Grouping by a method
   * const collection = new Collection([{ id: 1, value: 10 }, { id: 2, value: 20 }, { id: 3, value: 10 }]);
   * const groupedByValue = collection.groupBy(item => item.value.toString());
   * // Result: { '10': [{ id: 1, value: 10 }, { id: 3, value: 10 }], '20': [{ id: 2, value: 20 }] }
   */
  groupBy<K extends keyof T>(
    keyOrMethod: K | ((item: T) => string)
  ): Record<string, T[]> {
    return this.reduce((acc, item) => {
      const groupKey =
        typeof keyOrMethod === "function"
          ? keyOrMethod(item)
          : (item[keyOrMethod] as unknown as string);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  }
}
