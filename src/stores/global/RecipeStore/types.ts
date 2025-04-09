export interface RecipeItem {
    documentId: number,
    name: string,
    calories: number,
    summary: string,
    images: Images[],
    totalTime: number
}

export interface Images {
    url: string
}

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