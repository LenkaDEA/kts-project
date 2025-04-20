export interface AuthData {
    jwt: string,
    user: {}
}

export interface IAuthStore {
    getAuth(
    ): Promise<void>;
}

