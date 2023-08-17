import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { TYPES } from '../../containers/types.js';
import GenericService from '../../generics/service.js';
import { Profile, ProfileRepository } from './types.js';

@injectable()
class ProfileService extends GenericService<Profile> {
  constructor(
    @inject(TYPES.ProfileRepository) profileRepository: ProfileRepository
  ) {
    super(profileRepository);
  }

  override getDocumentSchema(): z.ZodType<Profile, z.ZodTypeDef, Profile> {
    return z.object({
      userId: z.string().nonempty(),
      birthday: z.string().nonempty()
    }) satisfies z.ZodType<Profile>;
  }
}

export default ProfileService;
