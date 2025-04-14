export type GetRecipesListParams = {
    perPage?: number;
    page?: number;
    search?: string;
    categories?: string[];
};

export interface IRecipesStore {
    getRecipesList(
        params: GetRecipesListParams
    ): Promise<void>;
}