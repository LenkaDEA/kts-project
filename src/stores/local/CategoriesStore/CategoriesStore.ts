import { ILocalStore } from 'stores/local/LocalStore';
import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import {
    ICategoriesStore
} from './type';
import { BASE_URL, CATEGORIES_ENDPOINT, PRIVATE_FIELDS_LIST } from 'config/apiUrls';
import { CategoriesData } from './type'




export default class CategoriesStore implements ICategoriesStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: CategoriesData = { data: [] };
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

    get list(): CategoriesData {
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getCategories(
        // params: GetCategoriesParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._list = { data: [] };

        const response = await this._apiStore.request<CategoriesData>({
            method: HTTPMethod.GET,
            data: {
                populate: '*'
            },
            headers: {},
            endpoint: CATEGORIES_ENDPOINT
        });

        runInAction(() => {
            if (response.success) {
                this._meta = Meta.success;
                this._list = response.data;
                return;
            }
            this._meta = Meta.error;
        })
    }


    reset(): void {
        this._list = { data: [] };
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }

}