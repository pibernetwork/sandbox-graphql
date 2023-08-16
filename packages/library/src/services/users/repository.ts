import { injectable } from "inversify";
import Repository from "../../generics/repository.js";
import { User } from "./types.js";

@injectable()
class UserRepository extends Repository<User> {
  override collectionName: string | null = "user";
}

export default UserRepository;
