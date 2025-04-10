export type GetRecipesListParams = {
    perPage?: number; // на одной странице
    page?: number; // номер страницы
    search?: string;
    categories?: string[];
};

export interface IRecipesStore {
    getRecipesList(
        params: GetRecipesListParams
    ): Promise<void>;
}