import { ILocalStore } from 'stores/local/LocalStore';
import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import {
    IRecipeDetailStore,
    GetRecipeDetailParams
} from './types';

import { BASE_URL, RECIPE_ENDPOINT, PRIVATE_FIELDS_RECIPE } from 'config/apiUrls';
import { normalizeRecipeDetailData, RecipeDetailDataModel, RecipeInfoApi } from 'stores/models/recipes/recipesDetail';

const POPULATE_ITEMS = ['ingradients', 'equipments', 'directions.image', 'images', 'category'];

export default class RecipeDetailStore implements IRecipeDetailStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _recipe: RecipeDetailDataModel = {
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

    get list(): RecipeDetailDataModel {
        return this._recipe;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getRecipeDetail(
        params: GetRecipeDetailParams
    ): Promise<void> {
        if (this._meta === Meta.loading) {
            console.warn('Запрос уже выполняется');
            return;
        }
        this._meta = Meta.loading;

        try {
            const response = await this._apiStore.request<{ data: RecipeInfoApi }>({
                method: HTTPMethod.GET,
                data: {
                    populate: POPULATE_ITEMS,
                },
                headers: {},
                endpoint: `${RECIPE_ENDPOINT}/${params.documentID}`
            });

            runInAction(() => {
                if (response.success) {
                    try {
                        this._meta = Meta.success;
                        this._recipe = normalizeRecipeDetailData({
                            data: response.data.data,
                            meta: {}
                        });
                        return;
                    }
                    catch (e) {
                        console.log(e);
                        this._meta = Meta.error;
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