import "reflect-metadata";
import { Container } from "inversify";

import { UserModule } from "@/modules/users/di/user-module";
import { CoreModule } from "./core-module";

const container = new Container();
container.load(CoreModule, UserModule);
export default container;
