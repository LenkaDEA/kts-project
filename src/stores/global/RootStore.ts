import RecipesStore from "./RecipeStore";
import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly recipesList = new RecipesStore();
}