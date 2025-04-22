import { ImagesApi, ImagesModel, normalizeImages } from "stores/models/recipes"
import { DirectionsApi, DirectionsModel, normalizeDirections } from "./directions"
import { EquipmentsApi, EquipmentsModel, normalizeEquipments } from "./equipments"
import { IngradientsApi, IngradientsModel, normalizeIngradients } from "./ingradients"


export interface RecipeInfoApi {
    name: string,
    preparationTime?: number,
    cookingTime?: number,
    totalTime?: number,
    likes?: number,
    servings?: number,
    rating?: number,
    summary: string,
    ingradients: IngradientsApi[],
    equipments: EquipmentsApi[],
    directions: DirectionsApi[],
    images: ImagesApi[]
};

export interface RecipeInfoModel {
    name: string,
    preparationTime?: number,
    cookingTime?: number,
    totalTime?: number,
    likes?: number,
    servings?: number,
    rating?: number,
    summary: string,
    ingradients: IngradientsModel[],
    equipments: EquipmentsModel[],
    directions: DirectionsModel[],
    images: ImagesModel[]
};

export const normalizeRecipeInfo = (from: RecipeInfoApi): RecipeInfoModel => ({
    name: from.name,
    preparationTime: from.preparationTime,
    cookingTime: from.cookingTime,
    totalTime: from.totalTime,
    likes: from.likes,
    servings: from.servings,
    rating: from.rating,
    summary: from.summary,
    ingradients: from.ingradients.map(normalizeIngradients),
    equipments: from.equipments.map(normalizeEquipments),
    directions: from.directions.map(normalizeDirections),
    images: from.images.map(normalizeImages)
});