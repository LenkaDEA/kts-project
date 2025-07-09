export type GetAuthParams = {
    email: string,
    pass: string
}

export type GetRegisterAuth = {
    email: string,
    login: string,
    pass: string
}

export interface IAuthStore {
    getAuth(
        params: GetAuthParams
    ): Promise<void>;

    getRegisterAuth(
        params: GetRegisterAuth
    ): Promise<void>;

    validateAuth(): Promise<void>;
}

