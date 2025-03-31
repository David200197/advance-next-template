import "reflect-metadata";
import { Container } from "inversify";

import { UserModule } from "@/modules/users/di/user-module";
import { CoreModule } from "./core-module";

const container = new Container();
CoreModule(container);
UserModule(container);
export default container;
