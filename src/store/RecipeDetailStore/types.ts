export type GetRecipeDetailParams = {
    project: string;
    documentID: string;
};

export interface IRecipeDetailStore {
    getRecipeDetail(
        params: GetRecipeDetailParams
    ): Promise<void>;
}