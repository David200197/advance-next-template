import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { UserService } from "../services/user-service";

const load = (options: ContainerModuleLoadOptions) => {
  options.bind(UserService).toSelf().inSingletonScope();
};

export const UserModule = new ContainerModule(load);
