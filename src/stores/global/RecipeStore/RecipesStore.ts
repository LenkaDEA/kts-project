import ApiStore, { HTTPMethod } from 'stores/local/ApiStore';
import { Meta } from 'utils/meta'
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { BASE_URL, RECIPE_ENDPOINT, PRIVATE_FIELDS_LIST } from 'config/apiUrls';

import {
    IRecipesStore,
    GetRecipesListParams,
} from './types';
import { normalizeRecipeData, RecipeDataApi, RecipeDataModel, RecipeItemModel } from 'stores/models/recipes';

import rootStore from 'stores/global';


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
    private _listView: RecipeItemModel[] = [];

    private _meta: Meta = Meta.initial;

    private _lastCallTimer: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        makeObservable<RecipesStore, PRIVATE_FIELDS_LIST>(this, {
            _list: observable.ref,
            _meta: observable,
            _listView: observable.ref,
            list: computed,
            meta: computed,
            listView: computed,
            getRecipesList: action,
            setMeta: action,
            getRecipesListDebounced: action,
            setListView: action
        });
    }

    get list(): RecipeDataModel {
        return this._list;
    }

    get listView(): RecipeItemModel[] {
        return this._listView;
    }

    get meta(): Meta {
        return this._meta;
    }

    setMeta(value: Meta) {
        this._meta = value;
    }

    setListView(list: RecipeItemModel[]) {
        this._listView = list;
    }

    async getRecipesList(
        params: GetRecipesListParams
    ): Promise<void> {
        runInAction(() => {
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
        });

        try {
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
                if (!response.success) {
                    this._meta = Meta.error;
                    return;
                }

                try {
                    this._list = normalizeRecipeData({
                        data: response.data.data,
                        meta: response.data.meta
                    });

                    this._listView.push(...this._list.data.map(item => ({
                        documentId: item.documentId,
                        name: item.name,
                        calories: item.calories,
                        summary: item.summary,
                        images: item.images,
                        totalTime: item.totalTime
                    })));

                    this._meta = Meta.success;

                    rootStore.searchText.setActive(false);
                    rootStore.categories.setActive(false);
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
            })
        } catch (e) {
            this._meta = Meta.error;
            console.error('Ошибка сети:', e);
        };
    }

    getRecipesListDebounced = this.debounce(this.getRecipesList, 300);

    private debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
        return (...args: Parameters<F>): void => {
            if (this._lastCallTimer) {
                clearTimeout(this._lastCallTimer);
            }
            this._lastCallTimer = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }

}