import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import {
    IRecipeDetailStore,
    GetRecipeDetailParams,
    RecipeDetailData,
    RecipeInfo
} from './types';

import { BASE_URL, RECIPE_ENDPOINT, PRIVATE_FIELDS_RECIPE } from 'config/apiUrls';

const POPULATE_ITEMS = ['ingradients', 'equipments', 'directions.image', 'images', 'category'];

export default class RecipeDetailStore implements IRecipeDetailStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _recipe: RecipeDetailData = {
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
        makeObservable<RecipeDetailStore, PRIVATE_FIELDS_RECIPE>(this, {
            _recipe: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            reset: action,
            getRecipeDetail: action
        });
    }

    get list(): RecipeDetailData {
        return this._recipe;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getRecipeDetail(
        params: GetRecipeDetailParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._recipe = {
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
            endpoint: `${RECIPE_ENDPOINT}/${params.documentID}`
        });

        runInAction(() => {
            if (response.success) {
                this._meta = Meta.success;
                this._recipe = {
                    data: response.data.data,
                    meta: {}
                };
                return;
            }
            this._meta = Meta.error;
        })
    }


    reset(): void {
        this._recipe = {
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