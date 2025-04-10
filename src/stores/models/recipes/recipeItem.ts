import { ImagesApi, ImagesModel, normalizeImages } from "./images"

export interface RecipeItemApi {
    documentId: string,
    name: string,
    calories: number,
    summary: string,
    images: ImagesApi[],
    totalTime: number
};

export interface RecipeItemModel {
    documentId: string,
    name: string,
    calories: number,
    summary: string,
    images: ImagesModel[],
    totalTime: number
};

export const normalizeRecipeItem = (from: RecipeItemApi): RecipeItemModel => ({
    documentId: from.documentId,
    name: from.name,
    calories: from.calories,
    summary: from.summary,
    images: from.images.map(normalizeImages),
    totalTime: from.totalTime
});