import { ILocalStore } from 'store/interfaces/ILocalStore';
import ApiStore from 'store/ApiStore/ApiStore';
import { HTTPMethod } from 'store/ApiStore/types';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { RecipeItem } from 'store/RootStore/RecipeStore/types';
import { BASE_URL, RECIPE_ENDPOINT, PRIVATE_FIELDS_LIST } from 'config/apiUrls';

import {
    IRecipesStore,
    GetRecipesListParams,
} from './types';


export interface paginationRecipeList {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
}

export interface RecipeData {
    data: RecipeItem[],
    meta: { pagination: paginationRecipeList }
}


export default class RecipesStore implements IRecipesStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: RecipeData = {
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
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RecipesStore, PRIVATE_FIELDS_LIST>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            reset: action,
            getRecipesList: action
        });
    }

    get list(): RecipeData {
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

        const response = await this._apiStore.request<RecipeData>({
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
                this._meta = Meta.success;
                this._list = {
                    data: response.data.data,
                    meta: response.data.meta
                };
                return;
            }
            this._meta = Meta.error;
        })
    }


    reset(): void {
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
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}