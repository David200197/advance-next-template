import { Collection } from "@/modules/core/lib/Collection";
import { describe, it, expect } from "vitest";
import { Users } from "./models/users";
import { User, UserSchema } from "./models/user";

describe("Collection", () => {
  type Item = { id: number; name: string; category: string };

  const data: Item[] = [
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Banana", category: "Fruit" },
    { id: 3, name: "Carrot", category: "Vegetable" },
    { id: 4, name: "Apricot", category: "Fruit" },
  ];

  describe("groupBy", () => {
    it("should group items by a key", () => {
      const collection = new Collection(...data);
      const grouped = collection.groupBy("category");

      expect(Object.keys(grouped)).toEqual(["Fruit", "Vegetable"]);
      expect(grouped["Fruit"]).toHaveLength(3);
      expect(grouped["Vegetable"]).toHaveLength(1);
    });

    it("should group items by a custom function", () => {
      const collection = new Collection(...data);
      const grouped = collection.groupBy((item) => item.name[0]); // Group by first letter of name

      expect(Object.keys(grouped)).toEqual(["A", "B", "C"]);
      expect(grouped["A"]).toHaveLength(2);
      expect(grouped["B"]).toHaveLength(1);
      expect(grouped["C"]).toHaveLength(1);
    });
  });

  describe("advancedFilter", () => {
    it("should filter items by a query in all fields", () => {
      const collection = new Collection(...data);
      const filtered = collection.advancedFilter("Apple");

      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Apple");
    });

    it("should filter items by a query in specific fields", () => {
      const collection = new Collection(...data);
      const filtered = collection.advancedFilter(["name"], "Carrot");

      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Carrot");
    });

    it("should filter items by a query using a custom function", () => {
      const collection = new Collection(...data);
      const filtered = collection.advancedFilter(
        (item) => item.name,
        "Apricot"
      );

      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Apricot");
    });

    it("should return all items if the query is empty", () => {
      const collection = new Collection(...data);
      const filtered = collection.advancedFilter("");

      expect(filtered).toHaveLength(data.length);
    });

    it("should handle case-insensitive and accent-insensitive queries", () => {
      const collection = new Collection(...data);
      const filtered = collection.advancedFilter("ápple");

      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Apple");
    });

    it("should return an empty collection if no items match the query", () => {
      const collection = new Collection(...data);
      const filtered = collection.advancedFilter("Nonexistent");

      expect(filtered).toHaveLength(0);
    });
  });

  it("should group entities by a specified instance of class", () => {
    const userData: UserSchema[] = [
      { id: "1", name: "John Doe", email: "john.doe@example.com", age: 1 },
      { id: "2", name: "Jane Doe", email: "jane.doe@example.com", age: 1 },
      { id: "3", name: "John Smith", email: "john.smith@example.com", age: 1 },
    ];
    const users = Users.create(userData);
    const groupedByName = users.groupBy("name");
    expect(groupedByName["John Doe"]).instanceOf(Users);
    expect(groupedByName["John Doe"][0]).instanceOf(User);
  });
});
