import { ReactNode } from "react";

export abstract class Collection<T> extends Array<T> {
  render(caller: (item: T, key: string) => ReactNode) {
    return this.map((item, index) =>
      caller(item, `${JSON.stringify(item)}-${index}`)
    );
  }
}
