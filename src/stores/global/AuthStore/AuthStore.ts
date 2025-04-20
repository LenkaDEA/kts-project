import { ILocalStore } from 'stores/local/LocalStore';
import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { AuthData, IAuthStore } from './type';
import { AUTH_ENDPOINT, BASE_URL, PRIVATE_FIELDS_AUTH, VALIDATE_ENDPOINT } from 'config/apiUrls';

export default class AuthStore implements IAuthStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _user: AuthData = { jwt: '', user: {} };
    private _meta: Meta = Meta.initial;
    private _initialization: boolean = false;

    constructor() {
        makeObservable<AuthStore, PRIVATE_FIELDS_AUTH>(this, {
            _user: observable.ref,
            _meta: observable,
            _initialization: observable,
            user: computed,
            meta: computed,
            initialization: computed,
            reset: action,
            getAuth: action,
            validateAuth: action,
            initializeAuth: action
        });
    }

    get user(): AuthData {
        return this._user;
    }

    get meta(): Meta {
        return this._meta;
    }

    get initialization(): boolean {
        return this._initialization;
    }

    setToken(value: string) {
        this._user.jwt = value;
    }

    async getAuth(): Promise<void> {
        if (this._meta === Meta.loading) {
            console.warn('Запрос уже выполняется');
            return;
        }
        this._meta = Meta.loading;

        try {
            const response = await this._apiStore.request<AuthData>({
                method: HTTPMethod.POST,
                data: {
                    identifier: "foo.bar@strapi.io",
                    password: "Test1234",
                },
                headers: {},
                endpoint: AUTH_ENDPOINT
            });

            runInAction(() => {
                if (response.success) {
                    try {
                        this._meta = Meta.success;
                        this._user = response.data;
                        console.log(this._user);
                        localStorage.setItem('token', this._user.jwt);
                        this._initialization = true;
                        console.log(localStorage.getItem('token'))
                    }
                    catch (e) {
                        console.log(e);
                        this._meta = Meta.error;
                        this._user = { jwt: '', user: {} };
                    }
                }
                this._meta = Meta.error;
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
            const response = await this._apiStore.request<AuthData>({
                method: HTTPMethod.GET,
                data: {},
                headers: {
                    Authorization: `Bearer ${this._user.jwt}`
                },
                endpoint: VALIDATE_ENDPOINT
            });

            runInAction(() => {
                if (response.success) {
                    try {
                        this._meta = Meta.success;
                        this._user.user = response.data;
                        this.setToken(localStorage.getItem('token') || '');
                        this._initialization = true;

                        console.log(this._user);
                    }
                    catch (e) {
                        console.log(e);
                        this._meta = Meta.error;
                        this._user = { jwt: '', user: {} };
                    }
                }
                this._meta = Meta.error;
            })
        } catch (e) {
            this._meta = Meta.error;
            console.error('Ошибка сети:', e);
        };
    }

    initializeAuth() {
        // const token = localStorage.getItem("token");
        const token = '';
        if (token) {
            this.setToken(token);
            this.validateAuth();
        }
        else {
            this._initialization = false;
        }
    }


    reset(): void {
        this._user = { jwt: '', user: {} };
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }

}