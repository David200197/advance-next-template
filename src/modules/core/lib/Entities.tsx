import { Fragment, ReactNode } from "react";
import { Collection } from "./Collection";

interface Entity<ID> {
  id: ID;
}

export class Entities<T extends Entity<string>> {
  protected value: Collection<T>;

  constructor(value: T[]) {
    this.value = new Collection(...value);
  }

  render(component: (data: T) => ReactNode) {
    return this.value.map((data) => (
      <Fragment key={data.id}>{component(data)}</Fragment>
    ));
  }
}
