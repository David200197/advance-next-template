import { ContainerModule } from "inversify";
import { UserService } from "../services/user-service";
import { UserFactory } from "../services/user-factory";

export const UserModule = new ContainerModule((bind) => {
  bind(UserService).toSelf().inSingletonScope();
  bind(UserFactory).toSelf().inSingletonScope();
});
