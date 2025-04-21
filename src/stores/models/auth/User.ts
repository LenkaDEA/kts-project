export interface UserApi {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}

export interface UserModel {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}

export const normalizeUser = (from: UserApi): UserModel => ({
    id: from.id,
    username: from.username,
    email: from.email,
    provider: from.provider,
    confirmed: from.confirmed,
    blocked: from.blocked,
    createdAt: from.createdAt,
    updatedAt: from.updatedAt
})