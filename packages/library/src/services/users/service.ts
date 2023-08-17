import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { TYPES } from '../../containers/types.js';
import GenericService from '../../generics/service.js';
import { User, UserRepository } from './types.js';

@injectable()
class UserService extends GenericService<User> {
  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    super(userRepository);
  }

  override getDocumentSchema(): z.ZodType<User, z.ZodTypeDef, User> {
    return z.object({
      email: z.string().nonempty()
    }) satisfies z.ZodType<User>;
  }
}

export default UserService;
