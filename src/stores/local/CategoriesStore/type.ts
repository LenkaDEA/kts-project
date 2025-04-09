export interface ICategoriesStore {
    getCategories(
    ): Promise<void>;
}

export interface CategoriesType {
    id: string,
    title: string
}

export interface CategoriesData {
    data: CategoriesType[]
}