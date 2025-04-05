import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import {
    IRecipeDetailStore,
    GetRecipeDetailParams,
} from './types';
import { Images } from 'App/App';

type PrivateFields = '_list' | '_meta';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/';
const POPULATE_ITEMS = ['ingradients', 'equipments', 'directions.image', 'images', 'category'];

export interface Ingradients {
    id: number,
    name: string,
    amount: number,
    unit: string
}

export interface Equipments {
    id: number,
    name: string
}

export interface Directions {
    id: number,
    description: string
}

export interface RecipeInfo {
    name: string,
    preparationTime?: number,
    cookingTime?: number,
    totalTime?: number,
    likes?: number,
    servings?: number,
    rating?: number,
    summary: string,
    ingradients: Ingradients[],
    equipments: Equipments[],
    directions: Directions[],
    images: Images[]
}

export interface RecipeDetailData {
    data: RecipeInfo,
    meta: {}
}

export default class RecipeDetailStore implements IRecipeDetailStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: RecipeDetailData = {
        data: {
            name: '',
            summary: '',
            ingradients: [],
            equipments: [],
            directions: [],
            images: []
        },
        meta: {}
    };
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RecipeDetailStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            reset: action,
            getRecipeDetail: action
        });
    }

    get list(): RecipeDetailData {
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getRecipeDetail(
        params: GetRecipeDetailParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._list = {
            data: {
                name: '',
                summary: '',
                ingradients: [],
                equipments: [],
                directions: [],
                images: []
            },
            meta: {}
        };

        const response = await this._apiStore.request<{ data: RecipeInfo }>({
            method: HTTPMethod.GET,
            data: {
                populate: POPULATE_ITEMS,
            },
            headers: {},
            endpoint: `${params.project}/${params.documentID}`
        });

        runInAction(() => {
            if (response.success) {
                this._meta = Meta.success;
                this._list = {
                    data: response.data.data,
                    meta: {}
                };
                return;
            }
            this._meta = Meta.error;
        })
    }


    reset(): void {
        this._list = {
            data: {
                name: '',
                summary: '',
                ingradients: [],
                equipments: [],
                directions: [],
                images: []
            },
            meta: {}
        };
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }

}