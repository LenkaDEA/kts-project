export type GetRecipeDetailParams = {
    documentID: string;
};

export interface IRecipeDetailStore {
    getRecipeDetail(
        params: GetRecipeDetailParams
    ): Promise<void>;
}





