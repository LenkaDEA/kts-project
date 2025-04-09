import { Images } from 'stores/global/RecipeStore/types';

export type GetRecipeDetailParams = {
    documentID: string;
};

export interface IRecipeDetailStore {
    getRecipeDetail(
        params: GetRecipeDetailParams
    ): Promise<void>;
}

export interface Ingradients {
    id: number,
    name: string,
    amount: number,
    unit: string
}

export interface Equipments {
    id: number,
    name: string
}

export interface Directions {
    id: number,
    description: string
}

export interface RecipeInfo {
    name: string,
    preparationTime?: number,
    cookingTime?: number,
    totalTime?: number,
    likes?: number,
    servings?: number,
    rating?: number,
    summary: string,
    ingradients: Ingradients[],
    equipments: Equipments[],
    directions: Directions[],
    images: Images[]
}

export interface RecipeDetailData {
    data: RecipeInfo,
    meta: {}
}