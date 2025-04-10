export interface CategoriesTypeApi {
    id: string,
    title: string
};

export interface CategoriesTypeModel {
    id: string,
    title: string
};

export const normalizeCategoriesType = (from: CategoriesTypeApi): CategoriesTypeModel => ({
    id: from.id,
    title: from.title
});