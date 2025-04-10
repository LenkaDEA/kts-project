import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { BASE_URL, RECIPE_ENDPOINT, PRIVATE_FIELDS_LIST } from 'config/apiUrls';

import {
    IRecipesStore,
    GetRecipesListParams,
} from './types';
import { normalizeRecipeData, RecipeDataApi, RecipeDataModel, RecipeItemModel } from 'stores/models/recipes';


export default class RecipesStore implements IRecipesStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: RecipeDataModel = {
        data: [] as RecipeItemModel[],
        meta: {
            pagination: {
                page: 0,
                pageCount: 0,
                pageSize: 0,
                total: 0
            }
        }
    };
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RecipesStore, PRIVATE_FIELDS_LIST>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getRecipesList: action
        });
    }

    get list(): RecipeDataModel {
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getRecipesList(
        params: GetRecipesListParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._list = {
            data: [],
            meta: {
                pagination: {
                    page: 0,
                    pageCount: 0,
                    pageSize: 0,
                    total: 0
                }

            }
        };

        const response = await this._apiStore.request<RecipeDataApi>({
            method: HTTPMethod.GET,
            data: {
                populate: ['images'],
                filters: {
                    name: {
                        $containsi: params.search || '',
                    },
                    ...(params.categories && params.categories.length > 0 && {
                        category: {
                            id: {
                                $in: params.categories
                            }
                        }
                    })
                },
                pagination: {
                    page: params.page,
                    pageSize: params.perPage
                }
            },
            headers: {},
            endpoint: RECIPE_ENDPOINT
        });


        runInAction(() => {
            if (response.success) {
                try {
                    this._meta = Meta.success;
                    this._list = normalizeRecipeData({
                        data: response.data.data,
                        meta: response.data.meta
                    });
                    return;
                } catch (e) {
                    console.log(e);
                    this._meta = Meta.error;
                    this._list = {
                        data: [],
                        meta: {
                            pagination: {
                                page: 0,
                                pageCount: 0,
                                pageSize: 0,
                                total: 0
                            }

                        }
                    };
                }

            }
            this._meta = Meta.error;
        })
    }
}