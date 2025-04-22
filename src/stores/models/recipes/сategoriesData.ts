import { CategoriesTypeApi, CategoriesTypeModel, normalizeCategoriesType } from "./categoriesType";

export interface CategoriesDataApi {
    data: CategoriesTypeApi[]
};

export interface CategoriesDataModel {
    data: CategoriesTypeModel[]
};

export const normalizeCategoriesData = (from: CategoriesDataApi): CategoriesDataModel => ({
    data: from.data.map(normalizeCategoriesType)
});