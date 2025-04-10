import { normalizePaginationRecipeList, PaginationRecipeListApi, PaginationRecipeListModel } from "./paginationRecipeList";
import { normalizeRecipeItem, RecipeItemApi, RecipeItemModel } from "./recipeItem";


export interface RecipeDataApi {
    data: RecipeItemApi[],
    meta: { pagination: PaginationRecipeListApi }
}

export interface RecipeDataModel {
    data: RecipeItemModel[],
    meta: { pagination: PaginationRecipeListModel }
}

export const normalizeRecipeData = (from: RecipeDataApi): RecipeDataModel => ({
    data: from.data.map(normalizeRecipeItem),
    meta: {
        pagination: normalizePaginationRecipeList(from.meta.pagination)
    }
});