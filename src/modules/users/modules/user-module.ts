import { ContainerModule } from "inversify";
import { UserService } from "../services/user-service";
import { ZodUserValidation } from "../services/zod-user-validation";
import { USER_DI } from "../di/constants";
import { UserValidator } from "../models/UserValidator";

export const UserModule = new ContainerModule((bind) => {
  bind(UserService).toSelf().inSingletonScope();
  bind<UserValidator>(USER_DI.VALIDATOR).to(ZodUserValidation).inRequestScope();
});
