import { RecipeInfoApi, RecipeInfoModel } from "./recipeInfo"

export interface RecipeDetailDataApi {
    data: RecipeInfoApi,
    meta: {}
};

export interface RecipeDetailDataModel {
    data: RecipeInfoModel,
    meta: {}
};

export const normalizeRecipeDetailData = (from: RecipeDetailDataApi): RecipeDetailDataModel => ({
    data: from.data,
    meta: from.meta
});