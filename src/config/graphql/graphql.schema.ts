
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrderDir {
    ASC = "ASC",
    DESC = "DESC"
}

export enum ProductIntervalType {
    YEAR = "YEAR",
    MONTH = "MONTH",
    WEEK = "WEEK",
    DAY = "DAY"
}

export class LoginInput {
    email: string;
    password: string;
}

export class ExchangeRefreshTokenInput {
    refreshToken: string;
}

export class EntityDeleteInput {
    id: string;
}

export class PagingInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    search?: Nullable<string>;
}

export class CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class UpdateUserInput {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
}

export interface Entity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export class LoginResponse {
    access_token?: Nullable<string>;
    refresh_token?: Nullable<string>;
    user?: Nullable<User>;
}

export abstract class IQuery {
    abstract ExchangeRefreshToken(input: ExchangeRefreshTokenInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract users(input?: Nullable<PagingInput>): Nullable<UserPagingResult> | Promise<Nullable<UserPagingResult>>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract Login(input: LoginInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): Nullable<UpdateResult> | Promise<Nullable<UpdateResult>>;

    abstract removeUser(id: number): Nullable<DeleteResult> | Promise<Nullable<DeleteResult>>;
}

export class App {
    appName?: Nullable<string>;
    appVersion?: Nullable<string>;
    graphQLPlayground?: Nullable<string>;
}

export class PagingMetaResult {
    count?: Nullable<number>;
    hasNextPage?: Nullable<boolean>;
}

export class User implements Entity {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    createdAt: Date;
    updatedAt: Date;
}

export class UserPagingResult {
    pagingMeta?: Nullable<PagingMetaResult>;
    data?: Nullable<Nullable<User>[]>;
}

export class UpdateResult {
    raw?: Nullable<User>;
    affected?: Nullable<number>;
}

export class DeleteResult {
    raw?: Nullable<User>;
    affected?: Nullable<number>;
}

type Nullable<T> = T | null;
