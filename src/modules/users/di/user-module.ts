import { Container } from "inversify";
import { UserService } from "../services/user-service";

export const UserModule = (container: Container) => {
  container.bind(UserService).toSelf().inSingletonScope();
};
