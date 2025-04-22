import { normalizeUser, UserApi, UserModel } from "./User"

export interface AuthDataApi {
    jwt: string,
    user: UserApi
}

export interface AuthDataModel {
    token: string,
    user: UserModel
}

export const normalizeAuthData = (from: AuthDataApi): AuthDataModel => ({
    token: from.jwt,
    user: normalizeUser(from.user)
})
