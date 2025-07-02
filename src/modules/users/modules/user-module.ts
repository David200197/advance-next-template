import { ContainerModule } from "inversify";
import { UserService } from "../services/user-service";
import { ZodUserValidator } from "../services/zod-user-validator";
import { USER_DI } from "../di/constants";
import { UserValidator } from "../models/UserValidator";

export const UserModule = new ContainerModule((bind) => {
  bind(UserService).toSelf().inSingletonScope();
  bind<UserValidator>(USER_DI.VALIDATOR).to(ZodUserValidator).inRequestScope();
});
