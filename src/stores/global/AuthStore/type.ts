export type GetAuthParams = {
    email: string,
    pass: string
}

export interface IAuthStore {
    getAuth(
        params: GetAuthParams
    ): Promise<void>;
}

