import { ILocalStore } from 'stores/local/LocalStore';
import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { GetAuthParams, IAuthStore } from './type';
import { AUTH_ENDPOINT, BASE_URL, PRIVATE_FIELDS_AUTH, VALIDATE_ENDPOINT } from 'config/apiUrls';
import { AuthDataApi, AuthDataModel, normalizeAuthData } from 'stores/models/auth/AuthData';
import { normalizeUser, UserApi, UserModel } from 'stores/models/auth/User';

const setDefaultUser = (): UserModel => {
    return {
        id: 0,
        username: '',
        email: '',
        provider: '',
        confirmed: false,
        blocked: false,
        createdAt: '',
        updatedAt: ''
    };
}

export default class AuthStore implements IAuthStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _user: AuthDataModel = {
        token: '',
        user: setDefaultUser()
    };
    private _meta: Meta = Meta.initial;
    private _initialization: boolean = false;
    private _isAuthCheckComplete = false;



    constructor() {
        makeObservable<AuthStore, PRIVATE_FIELDS_AUTH>(this, {
            _user: observable.ref,
            _meta: observable,
            _initialization: observable,
            _isAuthCheckComplete: observable,
            user: computed,
            meta: computed,
            initialization: computed,
            isAuthCheckComplete: computed,
            reset: action,
            getAuth: action,
            validateAuth: action,
            initializeAuth: action
        });
    }

    get user(): AuthDataModel {
        return this._user;
    }

    get meta(): Meta {
        return this._meta;
    }

    get initialization(): boolean {
        return this._initialization;
    }

    get isAuthCheckComplete(): boolean {
        return this._isAuthCheckComplete;
    }

    setToken(value: string) {
        this._user.token = value;
    }

    async getAuth(
        params: GetAuthParams
    ): Promise<void> {
        if (this._meta === Meta.loading) {
            console.warn('Запрос уже выполняется');
            return;
        }

        if (!params.email || !params.pass) {
            this._meta = Meta.error;
            return;
        }


        this._meta = Meta.loading;

        try {
            const response = await this._apiStore.request<AuthDataApi>({
                method: HTTPMethod.POST,
                data: {
                    identifier: params.email,
                    password: params.pass,
                },
                headers: {},
                endpoint: AUTH_ENDPOINT
            });

            runInAction(() => {
                if (response.success) {
                    try {
                        this._meta = Meta.success;
                        this._user = normalizeAuthData(response.data);
                        localStorage.setItem('token', this._user.token);
                        this._initialization = true;
                        this._isAuthCheckComplete = true;
                    }
                    catch (e) {
                        console.log(e);
                        this._meta = Meta.error;
                        this._user = {
                            token: '',
                            user: setDefaultUser()
                        };
                    }
                } else {
                    this._meta = Meta.error;
                }
            })
        } catch (e) {
            this._meta = Meta.error;
            console.error('Ошибка сети:', e);
        };
    }

    async validateAuth(): Promise<void> {
        if (this._meta === Meta.loading) {
            console.warn('Запрос уже выполняется');
            return;
        }
        this._meta = Meta.loading;

        try {
            const response = await this._apiStore.request<UserApi>({
                method: HTTPMethod.GET,
                data: {},
                headers: {
                    Authorization: `Bearer ${this._user.token}`
                },
                endpoint: VALIDATE_ENDPOINT
            });

            runInAction(() => {
                if (response.success) {
                    try {
                        this._meta = Meta.success;
                        this._user.user = normalizeUser(response.data);
                        this.setToken(localStorage.getItem('token') || '');
                        this._initialization = true;
                    }
                    catch (e) {
                        console.log(e);
                        this._meta = Meta.error;
                        this._user = {
                            token: '',
                            user: setDefaultUser()
                        };
                    }
                }
                this._meta = Meta.error;

            })
        } catch (e) {
            this._meta = Meta.error;
            console.error('Ошибка сети:', e);
        };
    }

    async initializeAuth() {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                this.setToken(token);
                await this.validateAuth();
            } else {
                runInAction(() => {
                    this._initialization = false;
                });
            }
        } finally {
            runInAction(() => {
                this._isAuthCheckComplete = true;
            });
        }
    }

    reset(): void {
        this._user = {
            token: '',
            user: setDefaultUser()
        };
        this._meta = Meta.initial;
        this._initialization = false;
        this._isAuthCheckComplete = false;
        localStorage.setItem('token', '');
    }

    destroy(): void {
        this.reset();
    }

}