import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongodb';
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
      userId: z.instanceof(ObjectId),
      birthday: z.string().nonempty(),
      weight: z.number().nonnegative()
    }) satisfies z.ZodType<Profile>;
  }
}

export default ProfileService;
