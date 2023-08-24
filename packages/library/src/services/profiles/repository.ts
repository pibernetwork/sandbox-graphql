import { injectable } from 'inversify';
import { WithId } from 'mongodb';
import GenericRepository from '../../generics/repository.js';
import { MongoDbRepositoryFindOptions } from '../../index.js';
import { Profile } from './types.js';

@injectable()
class ProfileRepository extends GenericRepository<Profile> {
  override collectionName: string | null = 'profile';

  // find
  override async findAllConnection(
    options: MongoDbRepositoryFindOptions<Profile>
  ): Promise<WithId<Profile>[]> {
    const collection = await this.getCollection(this.collectionName);

    const { sortBy, sortDirection, skip, limit, filter } = options;

    const aggregate = await collection
      .aggregate<WithId<Profile>>([
        { $match: filter },
        {
          $lookup: {
            from: 'user',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $sort: { [sortBy]: sortDirection } },
        { $limit: limit },
        { $skip: skip },
        { $unset: 'user' }
      ])
      .toArray();
    return aggregate;
  }
}

export default ProfileRepository;
