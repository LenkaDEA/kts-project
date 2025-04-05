import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import {
    ICategoriesStore,
    GetCategoriesParams,
} from './type';

type PrivateFields = '_list' | '_meta';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/';

export interface CategoriesType {
    id: string,
    title: string
}

export interface CategoriesData {
    data: CategoriesType[]
}


export default class CategoriesStore implements ICategoriesStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: CategoriesData = { data: [] };
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<CategoriesStore, PrivateFields>(this, {
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
        params: GetCategoriesParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._list = { data: [] };

        const response = await this._apiStore.request<CategoriesData>({
            method: HTTPMethod.GET,
            data: {
                populate: '*'
            },
            headers: {},
            endpoint: `${params.project}`
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