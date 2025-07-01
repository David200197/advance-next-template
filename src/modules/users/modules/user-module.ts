import { ContainerModule } from "inversify";
import { UserService } from "../services/user-service";
import { UserValidation } from "../services/user-validation";

export const UserModule = new ContainerModule((bind) => {
  bind(UserService).toSelf().inSingletonScope();
  bind(UserValidation).toSelf().inRequestScope();
});
