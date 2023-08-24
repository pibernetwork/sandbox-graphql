import { GraphQLResolveInfo } from 'graphql';
import { ProfileWithId, UserWithId } from 'library';
import { GraphQLContext } from './graphql/types.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type FilterBetween = {
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProfile?: Maybe<Profile>;
  delProfile: Scalars['String']['output'];
  editProfile?: Maybe<Profile>;
};


export type MutationAddProfileArgs = {
  birthday: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};


export type MutationDelProfileArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEditProfileArgs = {
  _id: Scalars['String']['input'];
  birthday: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalNodes: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  _id?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  nodes: Array<Profile>;
  pageInfo: PageInfo;
};

export type ProfileConnectionFilter = {
  weight?: InputMaybe<ProfileWeightFilter>;
};

export type ProfileWeightFilter = {
  between?: InputMaybe<FilterBetween>;
};

export type Query = {
  __typename?: 'Query';
  generated?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  profiles: Array<Maybe<Profile>>;
  profilesConnection: ProfileConnection;
  user: User;
  users?: Maybe<Array<Maybe<User>>>;
  usersOptions: Array<SelectOption>;
};


export type QueryProfileArgs = {
  _id: Scalars['String']['input'];
};


export type QueryProfilesConnectionArgs = {
  filters?: InputMaybe<ProfileConnectionFilter>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  sortBy: Scalars['String']['input'];
  sortOrder: Scalars['String']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
};

export type SelectOption = {
  __typename?: 'SelectOption';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  birthday?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  profiles: Array<Maybe<Profile>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  FilterBetween: FilterBetween;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Profile: ResolverTypeWrapper<ProfileWithId>;
  ProfileConnection: ResolverTypeWrapper<Omit<ProfileConnection, 'nodes'> & { nodes: Array<ResolversTypes['Profile']> }>;
  ProfileConnectionFilter: ProfileConnectionFilter;
  ProfileWeightFilter: ProfileWeightFilter;
  Query: ResolverTypeWrapper<{}>;
  SelectOption: ResolverTypeWrapper<SelectOption>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserWithId>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  FilterBetween: FilterBetween;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  Profile: ProfileWithId;
  ProfileConnection: Omit<ProfileConnection, 'nodes'> & { nodes: Array<ResolversParentTypes['Profile']> };
  ProfileConnectionFilter: ProfileConnectionFilter;
  ProfileWeightFilter: ProfileWeightFilter;
  Query: {};
  SelectOption: SelectOption;
  String: Scalars['String']['output'];
  User: UserWithId;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<MutationAddProfileArgs, 'birthday' | 'userId' | 'weight'>>;
  delProfile?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDelProfileArgs, '_id'>>;
  editProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<MutationEditProfileArgs, '_id' | 'birthday' | 'userId' | 'weight'>>;
}>;

export type PageInfoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prevPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalNodes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileConnectionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ProfileConnection'] = ResolversParentTypes['ProfileConnection']> = ResolversObject<{
  nodes?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  generated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfileArgs, '_id'>>;
  profiles?: Resolver<Array<Maybe<ResolversTypes['Profile']>>, ParentType, ContextType>;
  profilesConnection?: Resolver<ResolversTypes['ProfileConnection'], ParentType, ContextType, RequireFields<QueryProfilesConnectionArgs, 'limit' | 'page' | 'sortBy' | 'sortOrder'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  usersOptions?: Resolver<Array<ResolversTypes['SelectOption']>, ParentType, ContextType>;
}>;

export type SelectOptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SelectOption'] = ResolversParentTypes['SelectOption']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profiles?: Resolver<Array<Maybe<ResolversTypes['Profile']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileConnection?: ProfileConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SelectOption?: SelectOptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

