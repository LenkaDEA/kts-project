import { ILocalStore } from 'stores/local/LocalStore';
import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import {
    ICategoriesStore
} from './type';
import { BASE_URL, CATEGORIES_ENDPOINT, PRIVATE_FIELDS_LIST } from 'config/apiUrls';
import { CategoriesDataApi, CategoriesDataModel, normalizeCategoriesData } from 'stores/models/recipes';

export default class CategoriesStore implements ICategoriesStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: CategoriesDataModel = { data: [] };
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<CategoriesStore, PRIVATE_FIELDS_LIST>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            reset: action,
            getCategories: action
        });
    }

    get list(): CategoriesDataModel {
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getCategories(): Promise<void> {
        if (this._meta === Meta.loading) {
            console.warn('Запрос уже выполняется');
            return;
        }
        this._meta = Meta.loading;

        try {
            const response = await this._apiStore.request<CategoriesDataApi>({
                method: HTTPMethod.GET,
                data: {
                    populate: '*'
                },
                headers: {},
                endpoint: CATEGORIES_ENDPOINT
            });

            runInAction(() => {
                if (response.success) {
                    try {
                        this._meta = Meta.success;
                        this._list = normalizeCategoriesData(response.data);
                    }
                    catch (e) {
                        console.log(e);
                        this._meta = Meta.error;
                        this._list = { data: [] };
                    }
                }
                this._meta = Meta.error;
            })
        } catch (e) {
            this._meta = Meta.error;
            console.error('Ошибка сети:', e);
        };
    }


    reset(): void {
        this._list = { data: [] };
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }

}