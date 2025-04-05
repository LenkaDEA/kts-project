export type GetCategoriesParams = {
    project: string;
};

export interface ICategoriesStore {
    getCategories(
        params: GetCategoriesParams
    ): Promise<void>;
}