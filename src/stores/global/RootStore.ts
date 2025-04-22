import RecipesStore from "./RecipeStore";
import QueryParamsStore from "./QueryParamsStore";
import SearchFilterStore from "./SearchFilterStore";
import PaginationStore from "./PaginationStore";
import CategoriesChooseStore from "./CategoriesChooseStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly recipesList = new RecipesStore();
    readonly searchText = new SearchFilterStore();
    readonly pagination = new PaginationStore();
    readonly categories = new CategoriesChooseStore();
}