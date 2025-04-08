import RecipesStore from "./RecipeStore/RecipesStore";
import QueryParamsStore from "./QueryParamsStore/QueryParamsStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly recipesList = new RecipesStore();
}