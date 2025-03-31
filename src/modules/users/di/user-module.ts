import { ContainerModule } from "inversify";
import { UserService } from "../services/user-service";

export const UserModule = new ContainerModule((bind) => {
  bind(UserService).toSelf().inSingletonScope();
});
